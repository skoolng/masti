#!/usr/bin/env python3

import argparse
import json
from pathlib import Path

from pypdf import PdfReader, PdfWriter


def build_ranges(total_pages: int, parts: int) -> list[tuple[int, int]]:
    if parts < 2:
        raise ValueError("parts must be at least 2")
    if total_pages < parts:
        parts = total_pages

    base = total_pages // parts
    remainder = total_pages % parts
    ranges: list[tuple[int, int]] = []
    start = 0

    for index in range(parts):
        size = base + (1 if index < remainder else 0)
        end = start + size
        ranges.append((start, end))
        start = end

    return ranges


def write_part(reader: PdfReader, page_range: tuple[int, int], output_path: Path) -> int:
    writer = PdfWriter()
    start, end = page_range
    for page_index in range(start, end):
        writer.add_page(reader.pages[page_index])

    with output_path.open("wb") as fh:
        writer.write(fh)

    return end - start


def merge_parts(part_paths: list[Path], merged_path: Path) -> int:
    writer = PdfWriter()
    total_pages = 0

    for part_path in part_paths:
        reader = PdfReader(str(part_path))
        total_pages += len(reader.pages)
        for page in reader.pages:
            writer.add_page(page)

    merged_path.parent.mkdir(parents=True, exist_ok=True)
    with merged_path.open("wb") as fh:
        writer.write(fh)

    return total_pages


def main() -> int:
    parser = argparse.ArgumentParser(description="Split a PDF into parts and verify it can be merged back.")
    parser.add_argument("pdf_path", help="Path to the source PDF")
    parser.add_argument("--parts", type=int, default=3, help="Number of parts to create")
    parser.add_argument(
        "--merge-dir",
        default="/private/tmp/skoolngmasti_pdf_merge_checks",
        help="Directory for merged verification output",
    )
    args = parser.parse_args()

    pdf_path = Path(args.pdf_path).resolve()
    reader = PdfReader(str(pdf_path))
    total_pages = len(reader.pages)
    ranges = build_ranges(total_pages, args.parts)

    part_paths: list[Path] = []
    part_summaries: list[dict[str, object]] = []

    for index, page_range in enumerate(ranges, start=1):
        part_path = pdf_path.with_name(f"{pdf_path.stem}.part{index}of{len(ranges)}.pdf")
        page_count = write_part(reader, page_range, part_path)
        part_paths.append(part_path)
        part_summaries.append(
            {
                "path": str(part_path),
                "pages": page_count,
                "bytes": part_path.stat().st_size,
                "range_1_based": [page_range[0] + 1, page_range[1]],
            }
        )

    safe_name = "__".join(pdf_path.parts[-4:])
    merged_path = Path(args.merge_dir) / f"{safe_name}.merged-check.pdf"
    merged_pages = merge_parts(part_paths, merged_path)
    merged_reader = PdfReader(str(merged_path))

    verified = merged_pages == total_pages == len(merged_reader.pages)

    result = {
        "source": str(pdf_path),
        "source_bytes": pdf_path.stat().st_size,
        "source_pages": total_pages,
        "parts": len(ranges),
        "part_files": part_summaries,
        "merged_check_path": str(merged_path),
        "merged_check_bytes": merged_path.stat().st_size,
        "merged_check_pages": len(merged_reader.pages),
        "verified": verified,
    }
    print(json.dumps(result, indent=2))
    return 0 if verified else 1


if __name__ == "__main__":
    raise SystemExit(main())
