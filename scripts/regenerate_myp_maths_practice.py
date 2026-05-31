#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import math
import random
import re
from dataclasses import dataclass
from fractions import Fraction
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


@dataclass
class Question:
    text: str
    answer: str
    difficulty: str


@dataclass
class SetBlock:
    label: str
    subtitle: str
    questions: list[Question]


@dataclass
class ChapterSpec:
    path: Path
    series: str
    chapter_no: int
    title: str
    topic: str


SET_INFO = [
    ("SET A", "Foundation - Key Ideas"),
    ("SET B", "Core Practice - Skill Building"),
    ("SET C", "Application - Real World Problems"),
    ("SET D", "Challenge - Reasoning and Communication"),
]


SERIES_TOPICS = {
    "myp1": {
        1: "number_systems_basic",
        2: "percentages",
        3: "algebra_basic",
        4: "geometry_constructions",
        5: "fractions",
        6: "statistics_basic",
        7: "measurement_basic",
    },
    "myp2": {
        1: "ratio_proportion",
        2: "probability_basic",
        3: "signed_numbers",
        4: "algebra_intermediate",
        5: "geometry_2d3d",
        6: "rates",
        7: "univariate_data",
    },
    "myp2v2": {
        1: "whole_numbers",
        2: "number_properties",
        3: "lines_angles",
        4: "order_of_operations",
        5: "signed_numbers",
        6: "fractions",
        7: "decimals",
        8: "algebra_basic",
        9: "percentages",
        10: "equations_basic",
        11: "polygons",
        12: "measurement_length_area",
        13: "solids",
        14: "volume_capacity_mass",
        15: "coordinate_geometry_basic",
        16: "ratio_rates",
        17: "probability_basic",
        18: "statistics_basic",
        19: "transformations_basic",
    },
    "myp3": {
        1: "number_advanced",
        2: "triangles",
        3: "linear_relationships",
        4: "solids",
        5: "bivariate_data",
        6: "transformations_intermediate",
        7: "linear_systems",
    },
    "myp45": {
        1: "number_forms_advanced",
        2: "algebra_advanced",
        3: "coordinate_linear_advanced",
        4: "trigonometry",
        5: "vectors_coordinate_geometry",
        6: "statistics_advanced",
        7: "sequences_growth",
        8: "quadratics",
        9: "functions_advanced",
        10: "circle_geometry_proof",
        11: "probability_advanced",
        12: "review_mixed",
    },
    "myp45inq": {
        1: "review_mixed",
        2: "year3_extension",
        3: "relations_functions",
        4: "linear_functions",
        5: "linear_systems",
        6: "matrices",
        7: "quadratics",
        8: "similarity",
        9: "congruency",
        10: "coordinate_geometry_advanced",
        11: "circle_geometry",
        12: "trigonometry",
        13: "inverse_exp_log",
        14: "geometry_3d_advanced",
        15: "trig_equations_applications",
        16: "rational_irrational_functions",
        17: "sequences_series",
        18: "probability_advanced",
        19: "statistics_advanced",
        20: "discrete_math",
    },
    "myp45ext": {
        1: "review_mixed",
        2: "year3_extension",
        3: "relations_functions",
        4: "linear_functions",
        5: "linear_systems",
        6: "matrices",
        7: "quadratics",
        8: "similarity",
        9: "congruency",
        10: "coordinate_geometry_advanced",
        11: "circle_geometry",
        12: "trigonometry",
        13: "inverse_exp_log",
        14: "geometry_3d_advanced",
        15: "trig_equations_applications",
        16: "rational_irrational_functions",
        17: "sequences_series",
        18: "probability_advanced",
        19: "statistics_advanced",
        20: "discrete_math",
    },
}


SUMMARY_POINTS = {
    "number_systems_basic": [
        "classifying whole numbers, integers, fractions, decimals and simple percentages",
        "comparing and ordering numbers using place value and number lines",
        "using factors, multiples, primes and common divisors in simple contexts",
        "rounding and estimating to check whether an answer is reasonable",
        "connecting number skills to trade, counting and everyday measurement",
    ],
    "whole_numbers": [
        "reading, writing and comparing whole numbers with place value",
        "using the four operations accurately with whole numbers",
        "rounding and estimating to test whether a calculation makes sense",
        "solving one-step and multi-step whole-number word problems",
        "choosing efficient mental or written methods for computation",
    ],
    "number_properties": [
        "identifying factors, multiples, prime numbers and composite numbers",
        "using divisibility tests to check whether a number has a given factor",
        "finding common factors, common multiples, HCF and LCM",
        "recognising square numbers, cube numbers and patterns in sequences",
        "using number properties to justify shortcuts and checks",
    ],
    "order_of_operations": [
        "applying brackets, indices, division, multiplication, addition and subtraction in order",
        "using inverse operations to check whether a result is correct",
        "choosing efficient number strategies for mental and written calculation",
        "estimating before calculating so answers can be checked for reasonableness",
        "communicating each step clearly in a multi-step numerical expression",
    ],
    "number_advanced": [
        "working with powers, roots, standard form and rational or irrational numbers",
        "using index laws to simplify expressions and compare very large or small values",
        "rounding to a suitable level of accuracy using decimal places or significant figures",
        "interpreting number patterns and writing general rules from them",
        "using precise notation to explain how number ideas connect",
    ],
    "number_forms_advanced": [
        "classifying real numbers, including rational and irrational values",
        "rewriting numbers using powers, roots, surds and standard form",
        "using index laws and negative powers to express the same quantity in different ways",
        "working with accuracy, approximation and significant figures",
        "explaining why different forms of the same number can be useful in different contexts",
    ],
    "signed_numbers": [
        "locating positive and negative numbers on a number line",
        "adding, subtracting, multiplying and dividing signed numbers",
        "interpreting negative values in contexts such as temperature, elevation and finance",
        "using brackets and order of operations with signed numbers",
        "checking whether answers are sensible by thinking about direction and change",
    ],
    "fractions": [
        "simplifying fractions and generating equivalent fractions",
        "moving between mixed numbers and improper fractions",
        "adding, subtracting, multiplying and dividing fractions",
        "finding a fraction of a quantity and comparing fractional amounts",
        "using fraction reasoning in recipes, sharing and measurement tasks",
    ],
    "decimals": [
        "reading, writing and comparing decimals with place value",
        "converting between decimals, fractions and percentages where appropriate",
        "adding, subtracting, multiplying and dividing decimals accurately",
        "rounding decimals to a stated place value or level of accuracy",
        "applying decimal reasoning in money, metric and measurement contexts",
    ],
    "percentages": [
        "converting between fractions, decimals and percentages",
        "finding percentages of quantities in practical situations",
        "working with percentage increase, decrease and percentage change",
        "using reverse percentages to recover an original amount",
        "interpreting discounts, tax, profit and comparison data through percentages",
    ],
    "ratio_proportion": [
        "simplifying and comparing ratios",
        "sharing quantities in a given ratio",
        "solving direct proportion and scale problems",
        "using tables or multipliers to extend equivalent ratios",
        "connecting ratio thinking to cooperation, competition and resource allocation",
    ],
    "ratio_rates": [
        "simplifying ratios and expressing them in useful forms",
        "working with unit rates such as cost per item or speed per hour",
        "comparing best buys, exchange rates and other rate-based choices",
        "moving between tables, verbal descriptions and proportional calculations",
        "using proportional reasoning to justify decisions clearly",
    ],
    "rates": [
        "calculating unit rates and comparing rates of change",
        "solving distance, time, speed and flow-rate problems",
        "converting compound units when required",
        "modelling real systems where one quantity depends on another",
        "using rate reasoning to explain efficient or sustainable choices",
    ],
    "probability_basic": [
        "listing outcomes and describing sample spaces",
        "finding theoretical probability of simple events",
        "comparing theoretical and experimental probability",
        "using complements and simple combined events",
        "judging whether a game or experiment is fair from evidence",
    ],
    "probability_advanced": [
        "representing sample spaces clearly for multi-step events",
        "using conditional probability, independence and complementary events",
        "comparing theoretical models with experimental data",
        "deciding when permutations or combinations are needed in counting",
        "interpreting probability in uncertain real-life decisions",
    ],
    "statistics_basic": [
        "collecting or organising data in tables and charts",
        "calculating mean, median, mode and range",
        "choosing a suitable graph for a data set",
        "describing trends and simple comparisons from a display",
        "using data to make basic claims and decisions",
    ],
    "univariate_data": [
        "summarising one-variable data with tables and diagrams",
        "using mean, median, mode, range and quartiles appropriately",
        "comparing distributions using centre and spread",
        "recognising outliers and thinking about their effect on results",
        "linking numerical summaries to issues of fairness and access",
    ],
    "bivariate_data": [
        "plotting and interpreting scatter graphs for paired data",
        "describing positive, negative or no correlation",
        "drawing and using a line of best fit when appropriate",
        "commenting on interpolation, extrapolation and possible outliers",
        "questioning whether a relationship shown by data is useful or trustworthy",
    ],
    "statistics_advanced": [
        "comparing data sets using centre, spread and unusual values",
        "interpreting correlation carefully without assuming causation",
        "thinking about sampling methods, bias and reliability of conclusions",
        "using multiple representations to communicate what the data really show",
        "judging when a statistical claim is strong enough to support a decision",
    ],
    "algebra_basic": [
        "writing algebraic expressions from words or patterns",
        "collecting like terms and substituting values into expressions",
        "expanding simple brackets and factorising simple expressions",
        "solving one-step or two-step linear equations",
        "using algebra to describe and generalise numerical patterns",
    ],
    "equations_basic": [
        "solving one-step and two-step equations using balance methods",
        "checking a solution by substitution",
        "forming equations from short word problems",
        "rearranging simple formulas when one variable is required",
        "explaining each algebraic step clearly and logically",
    ],
    "algebra_intermediate": [
        "simplifying, expanding and factorising algebraic expressions",
        "solving linear equations from straightforward and contextual tasks",
        "forming expressions or formulas to represent situations",
        "substituting into formulas and evaluating expressions accurately",
        "using algebra to reveal patterns, tricks and general rules",
    ],
    "algebra_advanced": [
        "manipulating algebraic expressions efficiently and accurately",
        "rearranging formulas and solving equations with several steps",
        "comparing equivalent algebraic forms and deciding which is most useful",
        "using identities, factorising and substitution to justify a result",
        "communicating algebraic reasoning with clear notation and structure",
    ],
    "linear_relationships": [
        "reading and building tables for linear patterns",
        "finding gradient and intercept from equations, graphs or data",
        "drawing graphs of linear equations and interpreting what they mean",
        "moving between words, tables, graphs and rules for the same relationship",
        "using linear models to represent decisions and trends",
    ],
    "linear_functions": [
        "using function notation with linear rules",
        "interpreting gradient as a constant rate of change",
        "finding and using equations of the form y = mx + c",
        "reading intercepts and key points from a graph",
        "modelling practical situations with linear functions",
    ],
    "linear_systems": [
        "solving pairs of linear equations by substitution, elimination or graphing",
        "interpreting the point of intersection as a shared solution",
        "forming systems from practical or financial contexts",
        "checking solutions in both equations",
        "comparing methods and explaining why one is efficient in a given case",
    ],
    "matrices": [
        "reading matrix order and notation correctly",
        "adding, subtracting and scaling matrices where dimensions allow",
        "multiplying small matrices and interpreting the result",
        "using determinants or inverses in simple situations",
        "connecting matrix ideas to transformations or data structures",
    ],
    "relations_functions": [
        "distinguishing between a relation and a function",
        "describing domain, range and mapping rules",
        "evaluating a function for given inputs",
        "checking whether a rule gives exactly one output for each input",
        "connecting multiple representations of the same relationship",
    ],
    "functions_advanced": [
        "evaluating functions and interpreting domain or range",
        "using inverse and composite functions in straightforward cases",
        "comparing graphical, numerical and symbolic views of a function",
        "explaining transformations or features of a function graph",
        "using function models to make or test predictions",
    ],
    "inverse_exp_log": [
        "finding inverses for suitable functions and checking them",
        "using index laws to rewrite exponential expressions",
        "interpreting logarithms as inverse operations to powers",
        "solving simple exponential or logarithmic equations",
        "connecting growth or decay models to real situations",
    ],
    "rational_irrational_functions": [
        "simplifying rational expressions and stating restrictions",
        "recognising irrational terms such as roots that cannot be simplified to integers",
        "rationalising simple denominators when needed",
        "evaluating rational functions and describing excluded values",
        "comparing when rational and irrational forms are more informative",
    ],
    "quadratics": [
        "moving between expanded, factorised and vertex forms of a quadratic",
        "solving quadratic equations by factorising or other suitable methods",
        "identifying roots, intercepts, axis of symmetry and turning point",
        "interpreting the graph of a quadratic in context",
        "choosing an efficient form of a quadratic for a given task",
    ],
    "sequences_growth": [
        "spotting patterns and writing rules for number sequences",
        "working with arithmetic, geometric or Fibonacci-style growth",
        "finding a term number or the nth term of a sequence",
        "using recursive descriptions as well as explicit rules",
        "linking sequences to change, fairness or long-term growth models",
    ],
    "sequences_series": [
        "generating terms of arithmetic and geometric sequences",
        "finding explicit rules and recursive rules",
        "using formulas for the sum of a finite series where appropriate",
        "interpreting sequence models in finance, science or design",
        "communicating how a sequence changes from one term to the next",
    ],
    "discrete_math": [
        "using counting principles to organise possibilities",
        "distinguishing between permutations and combinations",
        "reasoning about networks, arrangements or decision paths",
        "using patterns or recursion in finite structures",
        "justifying strategies clearly in non-continuous mathematical settings",
    ],
    "geometry_constructions": [
        "constructing lines, angles and bisectors accurately with ruler and compass",
        "using geometric vocabulary such as perpendicular, parallel and bisect",
        "checking whether a construction is mathematically precise",
        "explaining the sequence of a construction step by step",
        "connecting geometric construction to design and creativity",
    ],
    "lines_angles": [
        "using angle facts around a point, on a line and in vertically opposite pairs",
        "solving angle problems involving parallel lines and transversals",
        "naming and classifying lines and angle relationships correctly",
        "showing a logical chain of reasoning when finding an unknown angle",
        "linking line and angle facts to diagrams in the real world",
    ],
    "polygons": [
        "classifying polygons by sides, angles and symmetry",
        "finding interior and exterior angle sums",
        "using properties of regular polygons",
        "reasoning about tessellations and shape structure",
        "explaining how polygon properties support design decisions",
    ],
    "transformations_basic": [
        "describing translations, reflections, rotations and enlargements",
        "plotting image points after a transformation",
        "using coordinates to communicate each movement precisely",
        "identifying congruent images under rigid transformations",
        "checking how a transformation changes position, orientation or size",
    ],
    "transformations_intermediate": [
        "combining translations, reflections, rotations and enlargements",
        "using coordinates and scale factors accurately",
        "describing which transformations preserve size and shape",
        "comparing single and combined transformations",
        "using transformation language to express ideas, values or design choices",
    ],
    "triangles": [
        "using angle sum and exterior angle facts in triangles",
        "working with isosceles, equilateral, scalene and right triangles",
        "applying congruence or Pythagoras in suitable cases",
        "using triangle properties to justify a result",
        "connecting triangle reasoning to engineered or natural structures",
    ],
    "similarity": [
        "identifying corresponding sides and angles in similar figures",
        "using scale factors to compare lengths, perimeters and areas",
        "recognising when shapes are similar but not congruent",
        "solving practical problems with maps, models or indirect measurement",
        "explaining why proportional reasoning works in similar shapes",
    ],
    "congruency": [
        "using congruence tests such as SSS, SAS, ASA or RHS",
        "explaining rigid transformations that preserve size and shape",
        "proving or checking that two shapes are congruent",
        "using congruence to justify equal lengths or equal angles",
        "connecting congruence to manufacturing, fit and precision",
    ],
    "geometry_2d3d": [
        "calculating perimeter, area, surface area or volume in suitable cases",
        "identifying properties of 2D shapes and 3D solids",
        "using nets, cross-sections or scale diagrams to reason visually",
        "selecting and converting units carefully",
        "applying geometry to human-made and natural landscapes",
    ],
    "measurement_basic": [
        "calculating perimeter, area and volume of common shapes",
        "using standard units and converting when needed",
        "solving problems about capacity, covering or packing space",
        "working with rectangles, triangles, prisms or cylinders in context",
        "linking measurement decisions to environmental or design choices",
    ],
    "measurement_length_area": [
        "measuring and calculating length, perimeter and area accurately",
        "choosing suitable units for classroom and real-life problems",
        "finding areas of rectangles, triangles and composite figures",
        "using scale drawings or simple plans to represent space",
        "checking whether an area result is sensible from the dimensions used",
    ],
    "solids": [
        "identifying faces, edges and vertices of common solids",
        "interpreting nets and simple cross-sections",
        "calculating surface area or volume of basic 3D shapes",
        "connecting shape structure to packaging or product design",
        "using diagrams to explain spatial reasoning clearly",
    ],
    "volume_capacity_mass": [
        "calculating volume of prisms or cylinders and interpreting the units",
        "converting between volume and capacity units when suitable",
        "using mass or density ideas in straightforward contexts",
        "choosing practical containers or measures from calculations",
        "checking whether a volume-based decision fits the context",
    ],
    "geometry_3d_advanced": [
        "calculating surface area and volume of complex 3D shapes",
        "using prisms, cylinders, pyramids, cones or spheres appropriately",
        "reasoning from nets, sections or projections",
        "combining measurement formulas with algebraic thinking",
        "connecting 3D geometry to modelling, design and engineering",
    ],
    "coordinate_geometry_basic": [
        "plotting and reading coordinates in the Cartesian plane",
        "using quadrants, distance, midpoint and simple gradient ideas",
        "describing movement on a grid clearly",
        "linking coordinate points to geometric shapes and patterns",
        "checking how coordinates support accurate communication",
    ],
    "coordinate_geometry_advanced": [
        "finding gradient, midpoint and distance between points",
        "writing equations of lines from information in graphs or coordinates",
        "comparing parallel and perpendicular relationships",
        "using algebra with coordinate geometry to justify results",
        "connecting coordinate methods to modelling and proof",
    ],
    "coordinate_linear_advanced": [
        "interpreting and graphing linear relationships in the coordinate plane",
        "using gradient and intercepts to compare lines",
        "finding equations of lines from points or graphs",
        "checking when lines are parallel, perpendicular or intersecting",
        "moving between graphical and algebraic forms confidently",
    ],
    "vectors_coordinate_geometry": [
        "describing translations and directed movement with vectors",
        "using coordinate geometry to find midpoint, distance and gradient",
        "adding or subtracting simple vectors",
        "interpreting position and displacement in geometric space",
        "connecting vector methods to motion and design in space",
    ],
    "trigonometry": [
        "using Pythagoras and right-triangle trigonometric ratios",
        "finding unknown sides or angles with clear working",
        "choosing sine, cosine or tangent appropriately",
        "interpreting heights, distances or bearings in context",
        "checking whether a trigonometric result is reasonable from the diagram",
    ],
    "trig_equations_applications": [
        "solving straightforward trigonometric equations",
        "using trigonometric identities or ratio facts in simplified cases",
        "modelling heights, distances or periodic situations",
        "interpreting multiple solutions where relevant",
        "explaining why a trigonometric method is suitable in context",
    ],
    "circle_geometry": [
        "using angle facts involving chords, tangents, arcs and circles",
        "working with cyclic quadrilaterals and tangent-radius properties",
        "identifying equal angles or lengths from circle theorems",
        "applying circle geometry in diagrams with clear reasons",
        "connecting theorem use to concise geometric communication",
    ],
    "circle_geometry_proof": [
        "using circle theorems with precise statements and reasons",
        "proving angle relationships in diagrams that involve tangents or chords",
        "linking centre, circumference and cyclic quadrilateral results",
        "showing a chain of logical justification rather than only a final answer",
        "reflecting on how formal reasoning gives value beyond a single calculation",
    ],
    "review_mixed": [
        "revisiting number, algebra, geometry and data as connected ideas",
        "choosing efficient methods instead of relying on one routine every time",
        "checking solutions with estimates, substitutions or diagrams",
        "communicating reasoning clearly enough for revision or assessment use",
        "identifying which earlier topics still need focused practice",
    ],
    "year3_extension": [
        "revisiting Year 3 ideas while extending them with deeper reasoning",
        "linking number, algebra and geometry instead of treating them separately",
        "selecting methods strategically and justifying why they work",
        "using patterns and structure to make efficient generalisations",
        "preparing for more formal MYP4-5 algebraic and geometric work",
    ],
}


NUMBER_WORDS = [
    "school festival",
    "community garden",
    "transport survey",
    "science fair",
    "art display",
    "sports day",
]


def stable_rng(key: str) -> random.Random:
    digest = hashlib.sha256(key.encode("utf-8")).hexdigest()
    return random.Random(int(digest[:16], 16))


def q(text: str, answer: str, difficulty: str) -> Question:
    return Question(text=text, answer=answer, difficulty=difficulty)


def fmt_num(value: float | int) -> str:
    if isinstance(value, int):
        return str(value)
    if abs(value - round(value)) < 1e-9:
        return str(int(round(value)))
    return f"{value:.2f}".rstrip("0").rstrip(".")


def fmt_money(value: float | int) -> str:
    rounded = round(value, 2)
    if abs(rounded - round(rounded)) < 1e-9:
        return f"Rs {int(round(rounded)):,}"
    return f"Rs {rounded:,.2f}"


def fmt_fraction(value: Fraction) -> str:
    if value.denominator == 1:
        return str(value.numerator)
    return f"{value.numerator}/{value.denominator}"


def fraction_answer(num: int, den: int) -> str:
    return fmt_fraction(Fraction(num, den))


def percent_change(old: float, new: float) -> str:
    pct = (new - old) / old * 100
    return f"{fmt_num(pct)}%"


def gradient(p1: tuple[int, int], p2: tuple[int, int]) -> Fraction:
    return Fraction(p2[1] - p1[1], p2[0] - p1[0])


def midpoint(p1: tuple[int, int], p2: tuple[int, int]) -> tuple[Fraction, Fraction]:
    return (Fraction(p1[0] + p2[0], 2), Fraction(p1[1] + p2[1], 2))


def distance_squared(p1: tuple[int, int], p2: tuple[int, int]) -> int:
    return (p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2


def html_escape(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def make_number_sets(spec: ChapterSpec, rng: random.Random) -> list[SetBlock]:
    a = rng.randint(20000, 90000)
    b = rng.randint(900, 4000)
    c = rng.randint(11, 25)
    d = rng.randint(4, 9)
    frac = Fraction(rng.randint(2, 9), rng.randint(10, 18))
    pow_base = rng.randint(2, 5)
    pow_exp = rng.randint(3, 5)
    order_expr = f"{rng.randint(12, 40)} - {rng.randint(3, 8)} x ({rng.randint(4, 9)} - {rng.randint(1, 3)})"
    order_value = eval(order_expr.replace("x", "*"))
    questions = [
        q(
            f"Write {a:,} in expanded form.",
            "Expand by place value, for example 50,304 = 50,000 + 300 + 4.",
            "Easy",
        ),
        q(
            f"Arrange these numbers in ascending order: {rng.randint(100, 999)}, {rng.randint(1000, 9999)}, {rng.randint(10, 99)}, {rng.randint(100, 999)}.",
            "Place the values from the smallest place value to the largest.",
            "Easy",
        ),
        q(
            f"Round {a + b} to the nearest 100.",
            f"{round((a + b) / 100) * 100}",
            "Easy",
        ),
        q(
            f"Find the value of {pow_base}^{pow_exp}.",
            str(pow_base**pow_exp),
            "Easy",
        ),
        q(
            f"Write {fmt_fraction(frac)} as a decimal.",
            fmt_num(float(frac)),
            "Easy",
        ),
        q(
            f"Evaluate {order_expr}.",
            str(order_value),
            "Medium",
        ),
        q(
            f"State whether {c} is prime or composite and give one reason.",
            "Accept a correct classification with a valid factor-based reason.",
            "Medium",
        ),
        q(
            f"Find the highest common factor of {d * 6} and {d * 9}.",
            str(d * 3),
            "Medium",
        ),
        q(
            f"Write {rng.randint(25, 95) * 1000} in standard form.",
            "Write as a x 10^n with 1 <= a < 10.",
            "Medium",
        ),
        q(
            f"In the chapter '{spec.title}', explain one reason why estimation is useful before a long calculation.",
            "A strong answer says estimation checks whether a later exact answer is reasonable.",
            "Hard",
        ),
        q(
            f"Use divisibility rules to decide whether {rng.randint(200, 900) * 3} is divisible by 3 and 9.",
            "Check the sum of digits and state which divisibility tests work.",
            "Easy",
        ),
        q(
            f"Find the least common multiple of {d * 2} and {d * 3}.",
            str(d * 6),
            "Easy",
        ),
        q(
            f"Write 0.{rng.randint(12, 89)} as a fraction in simplest form.",
            "Convert to hundredths and simplify fully.",
            "Medium",
        ),
        q(
            f"Classify sqrt({rng.choice([2, 3, 5, 7, 8, 12])}) as rational or irrational.",
            "Accept 'irrational' unless the number under the root is a perfect square.",
            "Medium",
        ),
        q(
            f"Evaluate {rng.randint(2, 5)}^0 and explain why the answer makes sense.",
            "1, with a clear explanation that any non-zero base to the power 0 equals 1.",
            "Medium",
        ),
        q(
            f"Find the square root of {rng.choice([36, 49, 64, 81, 100])}.",
            "Use the non-negative principal square root.",
            "Easy",
        ),
        q(
            f"A museum counted {a + b} visitors over four days. Estimate the total by rounding to the nearest thousand.",
            f"Approximately {round((a + b) / 1000) * 1000} visitors.",
            "Medium",
        ),
        q(
            f"Explain the difference between a factor and a multiple using your own example.",
            "A factor divides exactly; a multiple is found by repeated multiplication.",
            "Medium",
        ),
        q(
            f"Compare 3 x 10^4 and 2.8 x 10^5. Which is larger?",
            "2.8 x 10^5 is larger.",
            "Medium",
        ),
        q(
            f"Create a four-digit number using the digits 2, 4, 6 and 8 once each so the value is as large as possible.",
            "8642",
            "Hard",
        ),
        q(
            f"Write a rule for finding the next term in 4, 7, 10, 13, ... and give the 10th term.",
            "Add 3 each time; the 10th term is 31.",
            "Easy",
        ),
        q(
            f"Evaluate (6^2 - 5^2) / {rng.choice([11, 1])}.",
            "Compute the difference of squares first, then divide.",
            "Medium",
        ),
        q(
            f"A box holds {rng.randint(18, 45)} packets. {rng.randint(12, 24)} boxes arrive. Find the total number of packets.",
            "Multiply packets per box by the number of boxes.",
            "Medium",
        ),
        q(
            f"Explain why 0.4, 40% and {fmt_fraction(Fraction(2, 5))} represent the same amount.",
            "They all equal the same part of one whole.",
            "Medium",
        ),
        q(
            f"Choose a real-life quantity that is easier to write in standard form and explain why.",
            "Any sensible example of a very large or very small quantity is acceptable.",
            "Hard",
        ),
        q(
            f"Find the value of 2^5 x 2^3 and state the index law used.",
            "256; add the powers when multiplying like bases.",
            "Easy",
        ),
        q(
            f"If a value is rounded to 6,300 to the nearest hundred, write one possible original value.",
            "Any value from 6,250 to 6,349 is acceptable.",
            "Medium",
        ),
        q(
            f"Find two different factor pairs of {rng.choice([36, 48, 60, 72])}.",
            "Any two correct factor pairs are accepted.",
            "Easy",
        ),
        q(
            f"Explain whether 0.333... is rational or irrational.",
            "Rational, because it equals 1/3.",
            "Hard",
        ),
        q(
            f"A school records {rng.randint(3, 8)} buses with {rng.randint(28, 44)} seats each. Estimate and then find the exact total seats.",
            "Accept a sensible estimate and the exact product.",
            "Hard",
        ),
        q(
            f"Use the chapter title '{spec.title}' to write one sentence about how number forms can change the way information is communicated.",
            "Any relevant sentence linking representation and meaning is acceptable.",
            "Hard",
        ),
        q(
            f"Show two different ways to represent the number {rng.choice([1200, 4500, 9600])}.",
            "Accept any two correct equivalent forms such as words, expanded form, standard form or prime factor form.",
            "Hard",
        ),
        q(
            f"Evaluate sqrt({rng.choice([121, 144, 169])}) + {rng.randint(4, 12)}.",
            "Take the principal square root and then add.",
            "Medium",
        ),
        q(
            f"Identify which is larger without a calculator: 5^4 or 4^5.",
            "4^5 = 1024 is larger than 5^4 = 625.",
            "Hard",
        ),
        q(
            f"Find the missing number: 18, __, 30, 36 if the pattern adds the same amount each time.",
            "24",
            "Easy",
        ),
        q(
            f"Explain one advantage of writing a repeated multiplication as a power.",
            "A strong answer mentions efficiency, clarity or easier comparison.",
            "Medium",
        ),
        q(
            f"A population is reported as 4.26 x 10^6. Write it in ordinary form.",
            "4,260,000",
            "Easy",
        ),
        q(
            f"Decide whether sqrt(81) + sqrt(16) and sqrt(97) have the same value.",
            "No. The left side is 13 and sqrt(97) is not 13.",
            "Hard",
        ),
        q(
            f"Use a factor tree or prime factorisation method to write 72 as a product of prime numbers.",
            "2^3 x 3^2",
            "Medium",
        ),
        q(
            f"Write one exam-style check you would do after completing a long number problem in this chapter.",
            "Accept estimating, substituting back, or checking place value and units.",
            "Hard",
        ),
    ]
    return build_sets(questions)


def make_signed_number_sets(spec: ChapterSpec, rng: random.Random) -> list[SetBlock]:
    a = rng.randint(-18, -4)
    b = rng.randint(5, 19)
    c = rng.randint(-12, -3)
    d = rng.randint(2, 9)
    questions = [
        q(f"Calculate {a} + {b}.", str(a + b), "Easy"),
        q(f"Calculate {b} - ({a}).", str(b - a), "Easy"),
        q(f"Calculate {c} x {d}.", str(c * d), "Easy"),
        q(f"Calculate {c} / {-d}.", fmt_num(c / -d), "Easy"),
        q(f"Order these numbers from least to greatest: {a}, {b}, {c}, {-d}.", "Place the most negative value first.", "Easy"),
        q(f"What is the absolute value of {a}?", str(abs(a)), "Medium"),
        q(f"Evaluate {a} - {c} + {d}.", str(a - c + d), "Medium"),
        q(f"The temperature was {a} deg C in the morning and {b} deg C in the afternoon. What was the rise?", str(b - a), "Medium"),
        q(f"A diver is at {a} m and then rises {b} m. What is the new position relative to sea level?", str(a + b), "Medium"),
        q("Explain why a negative times a negative gives a positive result.", "Accept any correct pattern- or inverse-based explanation.", "Hard"),
        q(f"Calculate -3^2 and (-3)^2 and explain the difference.", "-3^2 = -9 and (-3)^2 = 9.", "Easy"),
        q(f"Evaluate {a} + {c} - ({-d}).", str(a + c + d), "Medium"),
        q(f"A bank balance changes from Rs {abs(a) * 100} in debt to Rs {b * 100} in credit. What is the total change?", fmt_money((b - a) * 100), "Medium"),
        q(f"Write two integers whose sum is {rng.randint(-6, 8)} and whose product is negative.", "Any valid pair with opposite signs is accepted.", "Medium"),
        q(f"Find the value of -({c}) + {a}.", str(-c + a), "Easy"),
        q(f"Plot and compare {a}, {c}, {b} and 0 on a number line. Which is closest to zero?", "Choose the value with the smallest absolute value.", "Easy"),
        q(f"Evaluate {d} - [ {a} - ({c}) ].", str(d - (a - c)), "Hard"),
        q(f"If a lift starts on floor {a} and moves up {b} floors, where does it stop?", str(a + b), "Medium"),
        q("State one common mistake learners make with subtracting a negative number.", "A common error is treating subtraction of a negative as subtraction instead of addition.", "Medium"),
        q(f"In '{spec.title}', describe a real-life situation where a negative answer makes sense.", "Any sensible context such as debt, temperature or elevation is accepted.", "Hard"),
        q(f"Find the missing number: __ + {a} = {c}.", str(c - a), "Easy"),
        q(f"Evaluate ({a})({-d}) + {b}.", str(a * -d + b), "Medium"),
        q(f"Compare -{b} and {a}. Which is greater?", "Use number-line reasoning with signed values.", "Medium"),
        q(f"Write the opposite of {c}.", str(-c), "Easy"),
        q(f"A submarine drops from {b} m to {a} m. How far did it descend?", str(b - a), "Medium"),
        q(f"Calculate ({a} + {b}) x {d}.", str((a + b) * d), "Medium"),
        q("Explain why absolute value and opposite value are related but not identical ideas.", "Absolute value is distance from zero; opposite value changes the sign.", "Hard"),
        q(f"Find two integers with product {abs(a * d)} and sum {-abs(a + d)} if possible.", "Accept any correct pair or a clear explanation if no such pair exists.", "Hard"),
        q(f"Evaluate {a}^2 - {b}.", str(a**2 - b), "Medium"),
        q(f"Which is lower: {a} deg C or {c} deg C? By how much?", f"The lower temperature is {min(a, c)} deg C; the difference is {abs(a - c)} deg C.", "Easy"),
        q("Write one checking strategy you could use after solving a signed-number word problem.", "Accept re-reading the context, using a number line or substituting the result back.", "Hard"),
        q(f"A game score changes by {a}, then {b}, then {c}. What is the final change?", str(a + b + c), "Medium"),
        q(f"Calculate ({c} - {a}) / {d}.", fmt_num((c - a) / d), "Hard"),
        q(f"Find an integer that is greater than {a} but less than {c}." if a < c else f"Find an integer that is greater than {c} but less than {a}.", "Any correct integer between the two values is accepted.", "Easy"),
        q(f"Simplify -(-({a})).", str(a), "Easy"),
        q(f"Explain how zero behaves when added to or subtracted from a signed number.", "Adding or subtracting zero does not change the number.", "Easy"),
        q(f"If {d} identical losses total {a * d}, what is the value of one loss?", str(a), "Medium"),
        q(f"Evaluate {b} + ({c} x {d}) - {a}.", str(b + c * d - a), "Hard"),
        q("Create a short signed-number context where a positive result means a decrease overall, and explain it.", "Any sensible example with a clear explanation is accepted.", "Hard"),
        q(f"How far apart are {a} and {b} on a number line?", str(abs(a - b)), "Medium"),
    ]
    return build_sets(questions)


def make_fraction_sets(spec: ChapterSpec, rng: random.Random) -> list[SetBlock]:
    a = Fraction(rng.randint(1, 5), rng.randint(6, 10))
    b = Fraction(rng.randint(2, 7), rng.randint(6, 12))
    c = Fraction(rng.randint(3, 9), rng.randint(2, 6))
    d = Fraction(rng.randint(2, 8), rng.randint(3, 9))
    questions = [
        q(f"Simplify {a.numerator * 3}/{a.denominator * 3}.", fmt_fraction(a), "Easy"),
        q(f"Write the improper fraction {c.numerator}/{c.denominator} as a mixed number if needed.", "Convert by dividing the numerator by the denominator.", "Easy"),
        q(f"Convert the mixed number {c.numerator // c.denominator} {c.numerator % c.denominator}/{c.denominator} to an improper fraction.", str(c), "Easy"),
        q(f"Calculate {fmt_fraction(a)} + {fmt_fraction(b)}.", fmt_fraction(a + b), "Medium"),
        q(f"Calculate {fmt_fraction(c)} - {fmt_fraction(d)}.", fmt_fraction(c - d), "Medium"),
        q(f"Calculate {fmt_fraction(a)} x {fmt_fraction(d)}.", fmt_fraction(a * d), "Medium"),
        q(f"Calculate {fmt_fraction(c)} / {fmt_fraction(a)}.", fmt_fraction(c / a), "Medium"),
        q(f"Which is larger: {fmt_fraction(a)} or {fmt_fraction(b)}? Explain briefly.", "Use equivalent fractions or decimal values to compare.", "Medium"),
        q(f"Find {fmt_fraction(a)} of {rng.randint(24, 96)}.", "Multiply the whole number by the fraction.", "Medium"),
        q("Explain why dividing by a fraction is the same as multiplying by its reciprocal.", "A correct explanation references inverse operations.", "Hard"),
        q(f"Write three fractions equivalent to {fmt_fraction(b)}.", "Multiply the numerator and denominator by the same non-zero integer each time.", "Easy"),
        q(f"Arrange these in ascending order: {fmt_fraction(a)}, {fmt_fraction(b)}, {fmt_fraction(d)}.", "Use common denominators or decimals.", "Medium"),
        q(f"Find the fraction of a day represented by {rng.choice([6, 8, 9, 10, 12])} hours.", "Write hours over 24 and simplify.", "Easy"),
        q(f"A recipe needs {fmt_fraction(a)} cup of oil for one batch. How much is needed for 3 batches?", fmt_fraction(a * 3), "Medium"),
        q(f"Find the missing number: __ x {fmt_fraction(d)} = 1.", fmt_fraction(1 / d), "Medium"),
        q(f"Shade or describe the fraction {fmt_fraction(a)} on a bar model and explain the equal parts.", "Accept any correct partition-and-shade description.", "Easy"),
        q(f"A class finished {fmt_fraction(c)} of a project on Monday and {fmt_fraction(d)} on Tuesday. What fraction is complete?", fmt_fraction(c + d), "Medium"),
        q(f"How much more is {fmt_fraction(c)} than {fmt_fraction(a)}?", fmt_fraction(c - a), "Medium"),
        q("State one reason learners need a common denominator when adding unlike fractions.", "The parts must represent equal-sized pieces before they can be combined.", "Hard"),
        q(f"In '{spec.title}', write one everyday situation where fractions communicate a quantity better than decimals.", "Any sensible example is accepted.", "Hard"),
        q(f"Simplify {fmt_fraction(Fraction(12, 18))}.", "2/3", "Easy"),
        q(f"Find {fmt_fraction(Fraction(3, 5))} of {rng.randint(20, 50)} and give the answer in simplest form.", "Multiply, then simplify if needed.", "Medium"),
        q(f"Calculate {fmt_fraction(a)} + {fmt_fraction(Fraction(1, 2))}.", fmt_fraction(a + Fraction(1, 2)), "Medium"),
        q(f"Calculate 1 - {fmt_fraction(d)}.", fmt_fraction(1 - d), "Easy"),
        q(f"Explain the difference between a proper fraction and an improper fraction.", "A proper fraction is less than 1; an improper fraction is at least 1.", "Easy"),
        q(f"Write {fmt_fraction(a)} as a percentage.", f"{fmt_num(float(a) * 100)}%", "Medium"),
        q(f"A tank is {fmt_fraction(d)} full. If its capacity is {rng.randint(240, 480)} L, how much water is inside?", "Multiply capacity by the fraction full.", "Medium"),
        q(f"Find two different fractions between {fmt_fraction(Fraction(1, 3))} and {fmt_fraction(Fraction(2, 3))}.", "Any two valid fractions in that interval are accepted.", "Hard"),
        q(f"Calculate ({fmt_fraction(a)} + {fmt_fraction(b)}) x 2.", fmt_fraction((a + b) * 2), "Hard"),
        q("Create a fraction word problem that requires subtraction and then solve it.", "Any correct self-created example with a valid solution is accepted.", "Hard"),
        q(f"Compare {fmt_fraction(Fraction(3, 4))} and {fmt_fraction(Fraction(5, 8))} using a common denominator.", "3/4 = 6/8, so 3/4 is larger.", "Easy"),
        q(f"Find the reciprocal of {fmt_fraction(c)}.", fmt_fraction(1 / c), "Easy"),
        q(f"A ribbon of length {rng.randint(3, 6)} m is cut into pieces of length {fmt_fraction(Fraction(3, 4))} m. How many full pieces can be made?", "Divide total length by piece length and count full pieces only.", "Hard"),
        q(f"Explain why {fmt_fraction(Fraction(2, 4))} and {fmt_fraction(Fraction(1, 2))} represent the same amount.", "They cover the same proportion of the whole.", "Medium"),
        q(f"Evaluate {fmt_fraction(Fraction(5, 6))} - {fmt_fraction(Fraction(1, 4))}.", "7/12", "Medium"),
        q(f"Write a mixed number equivalent to {fmt_fraction(Fraction(17, 4))}.", "4 1/4", "Easy"),
        q(f"Find the missing denominator: 3/5 = 12/__.", "20", "Easy"),
        q(f"Calculate {fmt_fraction(Fraction(7, 9))} / {fmt_fraction(Fraction(14, 27))}.", "3/2", "Hard"),
        q(f"Use a bar model, number line or area model to explain {fmt_fraction(Fraction(2, 3))} + {fmt_fraction(Fraction(1, 6))}.", "A clear visual explanation leading to 5/6 is accepted.", "Hard"),
        q("State one checking strategy that helps you spot a fraction-calculation error quickly.", "Accept estimating, using equivalent fractions or converting to decimals for a check.", "Medium"),
    ]
    return build_sets(questions)


def make_decimal_sets(spec: ChapterSpec, rng: random.Random) -> list[SetBlock]:
    a = round(rng.uniform(1.2, 9.8), 2)
    b = round(rng.uniform(0.3, 6.7), 2)
    c = round(rng.uniform(12.5, 48.5), 1)
    questions = [
        q(f"Write the value of the digit 7 in {rng.choice(['3.74', '17.05', '0.782'])}.", "State the place value of the digit 7 in the chosen number.", "Easy"),
        q(f"Round {c} to the nearest whole number.", str(round(c)), "Easy"),
        q(f"Round {a} to 1 decimal place.", f"{a:.1f}", "Easy"),
        q(f"Calculate {fmt_num(a)} + {fmt_num(b)}.", fmt_num(a + b), "Easy"),
        q(f"Calculate {fmt_num(c)} - {fmt_num(a)}.", fmt_num(c - a), "Easy"),
        q(f"Calculate {fmt_num(a)} x 10 and {fmt_num(a)} / 10.", f"{fmt_num(a * 10)} and {fmt_num(a / 10)}", "Medium"),
        q(f"Write {rng.choice(['0.45', '0.7', '1.25'])} as a fraction in simplest form.", "Convert to tenths or hundredths and simplify.", "Medium"),
        q(f"Convert {rng.choice(['3/4', '2/5', '7/20'])} to a decimal.", "Use equivalent tenths, hundredths or division.", "Medium"),
        q(f"A notebook costs Rs {fmt_num(a)} and a pen costs Rs {fmt_num(b)}. What is the total cost?", fmt_money(a + b), "Medium"),
        q("Explain why lining up decimal points matters in addition and subtraction.", "Place value must stay aligned so tenths, hundredths and whole numbers match.", "Hard"),
        q(f"Arrange these decimals in ascending order: {fmt_num(a)}, {fmt_num(b)}, {fmt_num(c)}.", "Compare place value from left to right.", "Easy"),
        q(f"Calculate {fmt_num(a)} x {rng.randint(2, 6)}.", fmt_num(a * rng.randint(2, 6)), "Medium"),
        q(f"Calculate {fmt_num(c)} / {rng.randint(2, 5)}.", "Divide and state the decimal result.", "Medium"),
        q(f"Which is greater: 0.6 or 0.59? Explain using place value.", "0.60 is greater than 0.59.", "Easy"),
        q(f"Write {rng.randint(35, 98)}% as a decimal.", "Divide by 100.", "Easy"),
        q(f"A runner completes 3 laps of {fmt_num(a)} km each. Find the total distance.", fmt_num(a * 3), "Medium"),
        q(f"Convert {rng.choice(['1.5 m', '0.75 kg', '2.35 L'])} to a smaller unit and keep the decimal meaning clear.", "Use the correct metric conversion factor.", "Hard"),
        q(f"Find the difference between Rs {fmt_num(c)} and Rs {fmt_num(a)}.", fmt_money(c - a), "Medium"),
        q("State one common decimal misconception and how to avoid it.", "Any realistic misconception with a clear correction is accepted.", "Hard"),
        q(f"In '{spec.title}', explain one reason decimals are useful in money or measurement.", "A strong answer mentions precision for non-whole amounts.", "Hard"),
        q(f"Write 2.305 in words.", "Two and three hundred five thousandths.", "Easy"),
        q(f"Multiply 0.4 x 0.3.", "0.12", "Medium"),
        q(f"Explain why 0.50 and 0.5 represent the same value.", "Trailing zeros to the right of a decimal do not change the value.", "Easy"),
        q(f"Round 9.876 to 2 decimal places.", "9.88", "Easy"),
        q(f"A bottle holds 1.25 L of juice. How much juice is in 4 bottles?", "5 L", "Medium"),
        q(f"Compare 1.08 and 1.8 using place value.", "1.8 is larger because it has 8 tenths, not 8 hundredths.", "Easy"),
        q(f"Calculate 12.5 + 0.75 + 3.6.", "16.85", "Medium"),
        q(f"Find a decimal between 0.4 and 0.5.", "Any valid example such as 0.45 is accepted.", "Easy"),
        q(f"Divide 3.6 by 0.6.", "6", "Hard"),
        q("Create a short shopping problem that uses at least two decimal prices and solve it.", "Any correct self-created problem and solution are accepted.", "Hard"),
        q(f"Convert 0.125 to a fraction and percentage.", "1/8 and 12.5%", "Medium"),
        q(f"Place 3.04, 3.4 and 3.004 in descending order.", "3.4, 3.04, 3.004", "Easy"),
        q(f"A journey of 18.75 km is split equally into 3 parts. How long is each part?", "6.25 km", "Medium"),
        q(f"Explain why 0.3 x 0.3 is smaller than 0.3.", "Multiplying by a number between 0 and 1 makes the value smaller.", "Hard"),
        q(f"Calculate 5 - 2.37.", "2.63", "Easy"),
        q(f"Round 0.0486 to 3 decimal places.", "0.049", "Medium"),
        q(f"Write 7/8 as a decimal.", "0.875", "Medium"),
        q(f"Use a number line description to show where 2.6 lies between 2 and 3.", "It is 6 tenths of the way from 2 to 3.", "Easy"),
        q("Give one reason estimation is helpful before multiplying decimals.", "It helps judge whether the final answer is too large or too small.", "Medium"),
        q(f"Calculate 0.09 x 1000.", "90", "Easy"),
    ]
    return build_sets(questions)


def make_percentage_sets(spec: ChapterSpec, rng: random.Random) -> list[SetBlock]:
    base = rng.randint(120, 900)
    pct = rng.choice([5, 10, 12, 15, 18, 20, 25, 30, 35])
    inc = rng.choice([8, 12, 15, 20, 25])
    dec = rng.choice([10, 15, 18, 20, 25])
    questions = [
        q(f"Write {pct}% as a fraction in simplest form.", fraction_answer(pct, 100), "Easy"),
        q(f"Write {pct}% as a decimal.", fmt_num(pct / 100), "Easy"),
        q(f"Find {pct}% of {base}.", fmt_num(base * pct / 100), "Easy"),
        q(f"{base} students were surveyed and {pct}% preferred cycling. How many students is that?", fmt_num(base * pct / 100), "Easy"),
        q(f"Increase {base} by {inc}%.", fmt_num(base * (1 + inc / 100)), "Medium"),
        q(f"Decrease {base} by {dec}%.", fmt_num(base * (1 - dec / 100)), "Medium"),
        q(f"A shirt marked {fmt_money(base)} is discounted by {dec}%. Find the sale price.", fmt_money(base * (1 - dec / 100)), "Medium"),
        q(f"A value rises from {base} to {int(base * 1.2)}. Find the percentage increase.", percent_change(base, int(base * 1.2)), "Medium"),
        q(f"After a {dec}% discount, a bike costs {fmt_money(base)}. Find the original price.", fmt_money(base / (1 - dec / 100)), "Hard"),
        q("Explain why a 20% increase followed by a 20% decrease does not return to the starting value.", "The second percentage is applied to a different base, so the changes are not symmetrical.", "Hard"),
        q(f"Convert {rng.choice(['3/5', '7/20', '9/25'])} to a percentage.", "Convert to hundredths or multiply by 100.", "Easy"),
        q(f"A test score improved from {rng.randint(32, 58)} to {rng.randint(60, 92)}. Find the percentage increase.", "Use change/original x 100.", "Medium"),
        q(f"VAT at {pct}% is added to an item costing {fmt_money(base)}. Find the total price.", fmt_money(base * (1 + pct / 100)), "Medium"),
        q(f"A phone battery falls from 100% to {rng.randint(28, 67)}%. What percentage has been used?", "Subtract the final percentage from 100.", "Easy"),
        q(f"In '{spec.title}', describe one situation where percentages help compare unlike totals fairly.", "Any correct comparison-based context is accepted.", "Hard"),
        q(f"Find 1% and then 15% of {base}.", f"1% = {fmt_num(base / 100)} and 15% = {fmt_num(base * 0.15)}", "Easy"),
        q(f"A store gives two successive discounts of 10% and 5% on {fmt_money(base)}. Find the final price.", fmt_money(base * 0.9 * 0.95), "Hard"),
        q(f"What percentage of {base} is {int(base * 0.4)}?", "40%", "Easy"),
        q(f"A population changes from {base} to {int(base * 0.82)}. Find the percentage decrease.", percent_change(base, int(base * 0.82)), "Medium"),
        q("State one common reverse-percentage mistake and how to avoid it.", "A common error is subtracting the percentage instead of dividing by the remaining percentage multiplier.", "Hard"),
        q(f"If 35% of a number is {rng.randint(70, 210)}, find the number.", "Divide the part by 0.35.", "Medium"),
        q(f"Compare a 25% discount and a Rs {base // 4} discount on an item costing Rs {base}. Which is larger?", "They are equal in this case.", "Medium"),
        q(f"Write one sentence explaining the meaning of a {pct}% probability or success rate.", "A correct interpretation links the percentage to an amount out of 100.", "Easy"),
        q(f"A charity spends 45% of its budget on food, 30% on transport and the rest on learning materials. What percentage remains for learning materials?", "25%", "Easy"),
        q(f"An item is marked up by {inc}% and then sold for {fmt_money(base * (1 + inc / 100))}. What was its original price?", fmt_money(base), "Medium"),
        q(f"Find the percentage of shaded parts if 18 out of 24 boxes are shaded.", "75%", "Easy"),
        q(f"Explain why 125% can still be a valid percentage.", "Percent means 'per 100', so values greater than 100% represent more than the original whole.", "Medium"),
        q(f"A data plan uses {rng.randint(18, 44)} GB out of 50 GB. What percentage is used?", "Compute part/whole x 100.", "Medium"),
        q(f"Estimate {pct}% of {base} by rounding the base first, then compare with the exact answer.", "Any sensible estimate and comparison are accepted.", "Hard"),
        q("Create a percentage problem about savings or spending and solve it.", "Any correct self-created problem and solution are accepted.", "Hard"),
        q(f"If a score of {base} rises by 12% and then by 8%, what is the final score?", fmt_num(base * 1.12 * 1.08), "Hard"),
        q(f"Write 0.375 as a percentage.", "37.5%", "Easy"),
        q(f"A cafe serves {base} meals in a day. {pct}% are vegetarian. How many are not vegetarian?", fmt_num(base - base * pct / 100), "Medium"),
        q(f"Explain how a bar model could help a learner solve a percentage-of-quantity problem.", "A strong answer shows the whole split into 100 equal parts or an equivalent partition.", "Medium"),
        q(f"What is the percentage error if an estimate is 200 and the exact answer is 220?", "About 9.09%", "Hard"),
        q(f"An exam has 80 marks. A learner scores 68. What percentage is that?", "85%", "Easy"),
        q(f"After a {dec}% decrease, a machine output is 820 units. Find the original output.", "Divide by the remaining percentage multiplier.", "Hard"),
        q(f"Choose whether 0.2, 20% and 1/5 are equivalent and justify your choice.", "Yes, they are equivalent.", "Easy"),
        q("Write one reason a pie chart often uses percentages instead of raw numbers.", "Percentages show the share of the whole clearly even when totals differ.", "Medium"),
        q(f"Increase {fmt_money(base)} by {pct}% and then round the answer to the nearest rupee.", fmt_money(round(base * (1 + pct / 100))), "Medium"),
    ]
    return build_sets(questions)


def make_ratio_rate_sets(spec: ChapterSpec, rng: random.Random) -> list[SetBlock]:
    a = rng.randint(2, 8)
    b = rng.randint(3, 9)
    total = (a + b) * rng.randint(4, 12)
    km = rng.randint(120, 360)
    h = rng.randint(2, 6)
    questions = [
        q(f"Simplify the ratio {a * 6}:{b * 6}.", f"{a}:{b}", "Easy"),
        q(f"Write {a}:{b} as a fraction in the form part/whole for the first part.", fraction_answer(a, a + b), "Easy"),
        q(f"Share {total} in the ratio {a}:{b}.", f"{fmt_num(total * a / (a + b))} and {fmt_num(total * b / (a + b))}", "Easy"),
        q(f"If pens and pencils are in the ratio {a}:{b} and there are {a * 7} pens, how many pencils are there?", str(b * 7), "Easy"),
        q(f"A map scale is 1:{rng.choice([5000, 10000, 25000, 50000])}. Explain what it means.", "1 unit on the map represents the stated number of the same units in real life.", "Medium"),
        q(f"A car travels {km} km in {h} hours. Find the average speed.", f"{fmt_num(km / h)} km/h", "Medium"),
        q(f"A packet of 6 costs Rs {rng.randint(42, 90)}. Find the unit price.", "Divide total cost by 6.", "Medium"),
        q(f"Find an equivalent ratio to {a}:{b} where the first term is {a * 9}.", f"{a * 9}:{b * 9}", "Medium"),
        q(f"Use direct proportion to find the cost of {rng.randint(8, 16)} kg if {rng.randint(3, 7)} kg costs Rs {rng.randint(120, 280)}.", "Find the unit cost first, then scale.", "Medium"),
        q("Explain why unit rates are useful when comparing two different package sizes.", "They compare all options on the same basis.", "Hard"),
        q(f"Write the ratio 0.{a}:0.{b} as a whole-number ratio.", f"{a}:{b}", "Easy"),
        q(f"A recipe uses flour and sugar in the ratio {a}:{b}. If flour is {a * 50} g, how much sugar is needed?", f"{b * 50} g", "Easy"),
        q(f"Which is the better buy: 750 mL for Rs 48 or 1 L for Rs 62?", "Compare the cost per litre.", "Medium"),
        q(f"A train covers {rng.randint(90, 180)} km in {rng.randint(1, 3)}.5 hours. Find the average speed.", "Distance divided by time.", "Medium"),
        q(f"In '{spec.title}', give one situation where a ratio communicates information better than a difference.", "Any sensible comparison context is accepted.", "Hard"),
        q(f"If boys:girls = {a}:{b} and there are {total} learners, how many boys are there?", fmt_num(total * a / (a + b)), "Easy"),
        q(f"A printing machine makes {rng.randint(240, 540)} sheets in {rng.randint(4, 9)} minutes. Find the rate in sheets per minute.", "Divide sheets by minutes.", "Medium"),
        q(f"Convert 72 km/h to m/s.", "20 m/s", "Hard"),
        q("State one warning sign that a learner has not simplified a ratio fully.", "The terms still share a common factor greater than 1.", "Easy"),
        q(f"A 1:{rng.choice([50, 100, 200])} scale drawing shows a rectangle 12 cm by 8 cm. Find one actual dimension.", "Multiply the drawing length by the scale factor.", "Medium"),
        q(f"Explain why 2:3 and 4:6 describe the same proportional relationship.", "Both ratios simplify to the same form.", "Easy"),
        q(f"A bike travels {rng.randint(48, 96)} km on {rng.randint(2, 6)} L of fuel. Find the fuel efficiency in km/L.", "Distance divided by litres.", "Medium"),
        q(f"A school club has money shared in the ratio {a}:{b}:{a + b}. If the total is Rs {rng.randint(600, 1800)}, describe how to find each share.", "Find one ratio part, then multiply by each term.", "Hard"),
        q(f"If 5 notebooks cost Rs 135, what do 8 notebooks cost at the same rate?", "Rs 216", "Medium"),
        q(f"Write one reason cross-multiplication works in simple proportion equations.", "It preserves equivalence because both sides represent the same multiplicative relationship.", "Hard"),
        q(f"The ratio of red to blue flags is {a}:{b}. If there are {b * 9} blue flags, how many red flags are there?", str(a * 9), "Easy"),
        q(f"Choose which trip is faster: 180 km in 3 h or 140 km in 2 h 20 min.", "Compare the average speed of each trip.", "Medium"),
        q("Create a ratio or rate problem connected to transport, shopping or sport and solve it.", "Any correct self-created problem and solution are accepted.", "Hard"),
        q(f"A worker fills {rng.randint(360, 720)} bottles in {rng.randint(6, 12)} minutes. How many bottles per minute?", "Divide bottles by minutes.", "Easy"),
        q(f"Find the missing value: {a}/{b} = x/{b * 4}.", str(a * 4), "Medium"),
        q(f"A scale drawing of a park is 7.5 cm long at a scale of 1:4000. Find the real length in metres.", "300 m", "Hard"),
        q("Explain the difference between a ratio and a rate using one example of each.", "A rate compares unlike units; a ratio compares like or unlike quantities without necessarily involving time or units.", "Medium"),
        q(f"If 12 workers complete a task in 15 days at the same rate, how many worker-days is the task?", "180 worker-days", "Hard"),
        q(f"A juice mix uses concentrate:water = 1:4. How much water is needed for 750 mL of concentrate?", "3000 mL", "Medium"),
        q(f"Decide whether this is proportional: 4 pens cost Rs 24 and 9 pens cost Rs 51.", "No, the unit cost is not constant.", "Hard"),
        q(f"Find the scale factor from 8 cm to 20 cm.", "2.5", "Easy"),
        q("State one checking strategy for a ratio-sharing problem.", "Add the shares back to the total or compare them to the original ratio.", "Medium"),
        q(f"A tap releases 18 L in 3 minutes. At the same rate, how long will it take to release 90 L?", "15 minutes", "Medium"),
        q(f"Convert 2.5 m/s to km/h.", "9 km/h", "Hard"),
        q(f"Explain why a graph through the origin often appears in direct proportion situations.", "When one quantity is zero, the other is zero, so the relationship starts at the origin.", "Hard"),
    ]
    return build_sets(questions)


def make_probability_sets(spec: ChapterSpec, rng: random.Random, advanced: bool) -> list[SetBlock]:
    red = rng.randint(3, 8)
    blue = rng.randint(2, 7)
    green = rng.randint(1, 5)
    total = red + blue + green
    heads = rng.randint(46, 68)
    questions = [
        q(f"A bag has {red} red, {blue} blue and {green} green counters. Find P(red).", fraction_answer(red, total), "Easy"),
        q(f"Using the same bag, find P(not blue).", fraction_answer(total - blue, total), "Easy"),
        q("List the sample space for one toss of a coin and one roll of a die.", "{H1, H2, ..., H6, T1, T2, ..., T6}", "Easy"),
        q("What is the probability of rolling an even number on a fair die?", "1/2", "Easy"),
        q("Find the probability of getting at least one head when two fair coins are tossed.", "3/4", "Medium"),
        q(f"A coin is tossed 100 times and lands heads {heads} times. What is the experimental probability of heads?", fraction_answer(heads, 100), "Medium"),
        q("Explain the difference between theoretical and experimental probability.", "Theoretical probability comes from the model; experimental probability comes from observed results.", "Medium"),
        q("A spinner has 8 equal sections numbered 1 to 8. What is the probability of landing on a prime number?", "1/2", "Medium"),
        q("State one reason a game can seem fair in theory but look unfair in a short experiment.", "Small sample sizes can produce random variation.", "Hard"),
        q(f"In '{spec.title}', explain one decision that should not be based on probability alone.", "Any sensible risk-based example is accepted.", "Hard"),
        q("What is the complement of an event?", "It is the event that the original event does not happen.", "Easy"),
        q("If P(A) = 0.35, find P(not A).", "0.65", "Easy"),
        q("A card is chosen from numbers 1 to 12. Find the probability of a multiple of 3.", "1/3", "Medium"),
        q("Draw or describe a simple tree diagram for tossing a coin twice.", "A correct two-level tree with H/T branches is accepted.", "Medium"),
        q("A die is rolled twice. What is the probability of getting double six?", "1/36", "Hard"),
        q("Explain why probabilities must lie between 0 and 1 inclusive.", "They measure impossible to certain events.", "Easy"),
        q("If two events are independent, what does that mean?", "One event does not change the probability of the other.", "Medium"),
        q("Find the probability of drawing a heart from a standard deck of cards.", "1/4", "Easy"),
        q("Find the probability of drawing a king or a queen from a standard deck.", "2/13", "Medium"),
        q("Describe one way to increase the reliability of an experimental-probability result.", "Repeat the experiment many more times under consistent conditions.", "Hard"),
        q("A spinner has red, yellow, yellow, blue sections of equal size. Find P(yellow).", "1/2", "Easy"),
        q("Two dice are rolled. What is the probability that the sum is 7?", "1/6", "Hard"),
        q("Explain why mutually exclusive events cannot happen at the same time.", "They have no common outcomes.", "Medium"),
        q("A bag contains only red and blue marbles. P(red)=3/5. If there are 25 marbles, how many are red?", "15", "Medium"),
        q("Give one example of an event with probability 0 and one with probability 1.", "Any correct impossible/certain examples are accepted.", "Easy"),
        q("If P(A and B) = P(A)P(B), what does that suggest about A and B?", "They are independent.", "Hard"),
        q("A weather forecast gives a 40% chance of rain. Write what that means in everyday language.", "Rain is expected on about 40 out of 100 similar days.", "Medium"),
        q("Create a fair game using a die or a spinner and explain why it is fair.", "Any correctly justified fair game is accepted.", "Hard"),
        q("What is the probability of not getting a 5 on a fair die?", "5/6", "Easy"),
        q("A number is chosen from 1 to 20. Find the probability it is both even and a multiple of 5.", "1/10", "Medium"),
        q("Explain why impossible, unlikely, even chance, likely and certain are useful verbal probability descriptors.", "They help connect numerical probability to qualitative meaning.", "Medium"),
        q("A class survey found 18 of 30 learners walk to school. Estimate the probability a randomly chosen learner walks to school.", "3/5", "Easy"),
        q("Write one probability question of your own and solve it.", "Any correct self-created problem and solution are accepted.", "Hard"),
        q("If one card is chosen from a standard deck, what is the probability it is a red face card?", "3/26", "Hard"),
        q("State one limitation of using only past data to predict the next random event.", "Past outcomes do not guarantee the next result in a random process.", "Medium"),
        q("A box holds 4 identical keys but only 1 opens the lock. Find the probability of opening the lock on the first try.", "1/4", "Easy"),
        q("Find the probability of selecting a vowel from the word MATHS if each letter is equally likely.", "1/5", "Medium"),
        q("Explain whether two successive coin tosses influence each other.", "No, they are independent events.", "Easy"),
        q("If 3 students are chosen at random, name one extra assumption you need before multiplying probabilities directly.", "Selection must be independent, or the model must account for replacement.", "Hard"),
        q("Describe one real-life claim that should be tested with both probability and data collection.", "Any sensible example such as games, medical tests or transport delay is accepted.", "Hard"),
    ]
    if advanced:
        questions[4] = q("Two fair dice are rolled. Find the probability that the sum is at least 10.", "1/6", "Medium")
        questions[14] = q("A box has 5 good bulbs and 3 faulty bulbs. Two bulbs are chosen without replacement. Find P(both good).", "5/14", "Hard")
        questions[25] = q("A team selects 2 captains from 6 students. Explain why combinations, not permutations, are used.", "Order does not matter when selecting captains if the roles are identical.", "Hard")
        questions[34] = q("If P(A)=0.4, P(B)=0.5 and P(A and B)=0.2, are A and B independent? Explain.", "Yes, because 0.4 x 0.5 = 0.2.", "Hard")
        questions[38] = q("State one condition under which conditional probability becomes different from the original probability.", "When knowledge of one event changes the sample space for the second event.", "Hard")
    return build_sets(questions)


def make_statistics_sets(spec: ChapterSpec, rng: random.Random, mode: str) -> list[SetBlock]:
    data = sorted(rng.sample(range(8, 31), 9))
    mean = sum(data) / len(data)
    median = data[len(data) // 2]
    questions = [
        q(f"Find the mean of: {', '.join(map(str, data))}.", fmt_num(mean), "Easy"),
        q(f"Find the median of: {', '.join(map(str, data))}.", str(median), "Easy"),
        q(f"Find the range of: {', '.join(map(str, data))}.", str(max(data) - min(data)), "Easy"),
        q("State one situation where a bar chart is more suitable than a line graph.", "A bar chart suits categories rather than continuous change over time.", "Easy"),
        q("Explain what an outlier is.", "It is a value far from the rest of the data.", "Easy"),
        q("A survey records favourite fruit choices. Which display would be suitable and why?", "A bar chart or pie chart is suitable for categorical data.", "Medium"),
        q("Give one reason the median can be more useful than the mean.", "The median is less affected by outliers.", "Medium"),
        q("Describe what the spread of a data set tells you.", "It shows how far the values vary from one another.", "Medium"),
        q(f"In '{spec.title}', explain why data should be interpreted carefully before making a claim.", "A strong answer mentions bias, sample size or misleading displays.", "Hard"),
        q("Create a small data set with mode 7 and range 10.", "Any valid data set is accepted.", "Hard"),
        q("What is the mode of 4, 6, 6, 8, 9, 9, 9, 12?", "9", "Easy"),
        q("A frequency table shows scores 1,2,3,4 with frequencies 2,5,4,1. How many results are there?", "12", "Easy"),
        q("Explain why the same mean can come from very different data sets.", "Different values can balance to the same average while having different spread.", "Medium"),
        q("Suggest one question that would produce numerical data and one that would produce categorical data.", "Any valid pair is accepted.", "Medium"),
        q("A graph axis starts at 90 instead of 0. Why might that be misleading?", "It can exaggerate small differences.", "Hard"),
        q("What is a frequency table used for?", "It organises how often each value or class occurs.", "Easy"),
        q("Describe one sampling method that could reduce bias in a school survey.", "Random sampling is a suitable example.", "Medium"),
        q("What does the interquartile range measure?", "It measures the spread of the middle 50% of the data.", "Medium"),
        q("Explain the difference between discrete and continuous data.", "Discrete data counts separate values; continuous data can take any value in an interval.", "Medium"),
        q("Give one reason data displays should always include clear labels and units.", "Without labels, the data can be misunderstood or misused.", "Hard"),
        q("Find the mean of 12, 15, 18, 21, 24.", "18", "Easy"),
        q("A class of 24 learners has a median score of 16. Explain what that means.", "Half the ordered scores are at or below 16 and half are at or above 16.", "Medium"),
        q("Choose which is better for showing change over time: bar chart or line graph. Explain.", "Usually a line graph for change over time.", "Easy"),
        q("What is the total frequency if class intervals have frequencies 5, 8, 11 and 6?", "30", "Easy"),
        q("Write one conclusion that should not be made from a very small sample.", "Any sensible caution about overgeneralising is accepted.", "Hard"),
        q("Describe one effect of an extreme outlier on the mean.", "It can pull the mean towards the outlier.", "Medium"),
        q("A frequency diagram shows 14 students reading 2 books, 10 reading 3 books and 6 reading 4 books. Which number of books is the mode?", "2 books", "Easy"),
        q("Explain why correlation does not automatically mean causation.", "Two variables can move together without one causing the other.", "Hard"),
        q("Suggest one way to improve the reliability of collected data.", "Use a larger, more representative sample or collect data carefully and consistently.", "Medium"),
        q("Create a real-life variable you could measure in your community and name a suitable graph.", "Any sensible variable and graph choice are accepted.", "Hard"),
        q("A data set has mean 12 and median 18. What might that suggest?", "The data may be skewed, possibly with low outliers.", "Hard"),
        q("Explain why grouped data only gives an estimate for the mean.", "Individual values in each class are not known exactly.", "Medium"),
        q("What information does a scatter graph show?", "It shows the relationship between two variables.", "Easy"),
        q("State one reason to keep raw data before making a graph.", "It allows checking, re-grouping and verifying conclusions.", "Medium"),
        q("Name one ethical issue to consider when collecting human data.", "Privacy, consent or fairness are acceptable answers.", "Hard"),
        q("A box plot would be useful when comparing which two features of distributions?", "Centre and spread.", "Medium"),
        q("Explain one risk of using only the mean to compare two groups.", "Different spread or outliers can be hidden.", "Hard"),
        q("Write one question that could produce bivariate data.", "Any question that records two linked variables is accepted.", "Medium"),
        q("Describe how you would check a calculated mean if you suspect a keyboard error.", "Re-add the data, estimate the mean or recompute with another method.", "Medium"),
        q("State one feature that makes a statistical argument convincing.", "Clear data, suitable representation and cautious interpretation.", "Hard"),
    ]
    if mode == "bivariate":
        questions[0] = q("Explain what positive correlation means on a scatter graph.", "As one variable increases, the other tends to increase.", "Easy")
        questions[1] = q("Explain what negative correlation means on a scatter graph.", "As one variable increases, the other tends to decrease.", "Easy")
        questions[2] = q("State one example of a pair of variables that might show no correlation.", "Any sensible unrelated pair is accepted.", "Easy")
        questions[7] = q("Why should extrapolation from a scatter graph be treated carefully?", "The pattern may not continue outside the observed data range.", "Medium")
        questions[17] = q("What does a line of best fit help you do?", "It summarises the trend and supports interpolation.", "Medium")
    if mode in {"advanced", "univariate"}:
        questions[17] = q("State how to interpret the interquartile range in context.", "It shows the spread of the middle half of the data.", "Medium")
        questions[27] = q("Explain why a misleading graph scale can change a reader's conclusion.", "It can exaggerate or hide differences.", "Hard")
    return build_sets(questions)


def make_algebra_sets(spec: ChapterSpec, rng: random.Random, level: str) -> list[SetBlock]:
    a = rng.randint(2, 7)
    b = rng.randint(3, 9)
    x_val = rng.randint(-3, 6)
    questions = [
        q(f"Simplify {a}x + {b}x.", f"{a + b}x", "Easy"),
        q(f"Substitute x = {x_val} into 3x + 5.", str(3 * x_val + 5), "Easy"),
        q(f"Expand 4(x + {a}).", f"4x + {4 * a}", "Easy"),
        q(f"Factorise {a * b}x + {a * 2}.", f"{a}({b}x + 2)", "Medium"),
        q(f"Solve {a}x + {b} = {a * x_val + b}.", str(x_val), "Medium"),
        q("Write an expression for 'five more than twice a number n'.", "2n + 5", "Easy"),
        q(f"Simplify 3x - 2 + {a}x + 7.", f"{a + 3}x + 5", "Medium"),
        q("Explain what a variable represents in algebra.", "It stands for a value that can change or is unknown.", "Easy"),
        q(f"In '{spec.title}', describe one pattern that algebra helps generalise.", "Any valid pattern-based explanation is accepted.", "Hard"),
        q("State one common error learners make when collecting like terms.", "A common error is combining unlike terms such as x and x^2.", "Hard"),
        q(f"Solve 2x - {a} = {b}.", fmt_num((b + a) / 2), "Easy"),
        q(f"Expand and simplify (x + {a})(x + {b}).", f"x^2 + {a + b}x + {a * b}", "Medium"),
        q(f"Find the value of y when y = {a}x - {b} and x = {x_val}.", str(a * x_val - b), "Easy"),
        q("Explain the difference between an expression and an equation.", "An equation contains an equals sign; an expression does not.", "Easy"),
        q(f"Rearrange y = {a}x + {b} to make x the subject.", f"x = (y - {b})/{a}", "Hard"),
        q(f"A number pattern starts at {b} and increases by {a} each time. Write the nth term.", f"{a}n + {b - a}", "Medium"),
        q("Why is substituting back useful after solving an equation?", "It checks whether the found value really satisfies the equation.", "Medium"),
        q(f"Solve 3(x - {a}) = {3 * (x_val - a)}.", str(x_val), "Medium"),
        q("Create a short word problem that can be written as 4x + 7 = 31 and solve it.", "x = 6, plus any valid matching context.", "Hard"),
        q("Explain one reason algebra can make a method look 'clever'.", "It reveals structure and makes a rule work for many cases at once.", "Hard"),
        q(f"Collect like terms in {a}x + 4 - 2x + {b}.", f"{a - 2}x + {4 + b}", "Easy"),
        q(f"Factorise x^2 + {a + b}x + {a * b}.", f"(x + {a})(x + {b})", "Medium"),
        q(f"Solve {a}(x + 1) = {a * (x_val + 1)}.", str(x_val), "Medium"),
        q("What does it mean for two expressions to be equivalent?", "They have the same value for all allowed values of the variable.", "Medium"),
        q(f"Write a formula for the perimeter of a rectangle with length x + {a} and width x + {b}.", f"4x + {2 * (a + b)}", "Medium"),
        q("Explain why every step in an equation solution must keep both sides balanced.", "Otherwise the new equation would not be equivalent to the original one.", "Hard"),
        q(f"If f(x) = 2x + {a}, find f({b}).", str(2 * b + a), "Medium"),
        q(f"Solve (x/{a}) + {b} = {x_val / a + b}.", str(x_val), "Hard"),
        q("Describe one way algebra connects to a geometric pattern or design.", "Any sensible link to growth, perimeter, tiling or symmetry is accepted.", "Hard"),
        q(f"Simplify {a}(2x - 3) + {b}.", f"{2 * a}x + {b - 3 * a}", "Medium"),
        q(f"Write and solve an equation for 'three less than twice a number is {2 * x_val - 3}'.", f"2n - 3 = {2 * x_val - 3}, so n = {x_val}", "Medium"),
        q("State one difference between expanding and factorising.", "Expanding multiplies out; factorising writes an expression as a product.", "Easy"),
        q(f"Find the gradient of the line y = {a}x + {b}.", str(a), "Medium"),
        q(f"Evaluate 2a + 3b when a = {a} and b = {b}.", str(2 * a + 3 * b), "Easy"),
        q("Explain why algebra is useful for proving that a pattern always works.", "It uses variables to represent any case, not just one example.", "Hard"),
        q(f"Solve 5 - x = {5 - x_val}.", str(x_val), "Easy"),
        q(f"Expand (x - {a})^2.", f"x^2 - {2 * a}x + {a * a}", "Hard"),
        q("Write one checking question you would ask yourself after simplifying an expression.", "Accept any check about like terms, signs or equivalence.", "Medium"),
        q(f"Find x if the area of a square is x^2 = {a * a}.", f"x = {a} or x = -{a}; in many geometric contexts use x = {a}.", "Hard"),
        q("Describe one way algebra reduces repeated arithmetic work.", "It creates a reusable rule or formula.", "Medium"),
    ]
    if level in {"advanced", "intermediate"}:
        questions[14] = q(f"Rearrange v = u + {a}t to make t the subject.", f"t = (v - u)/{a}", "Hard")
        questions[27] = q(f"Solve (2x + {a})/3 = {2 * x_val + a}/3.", str(x_val), "Hard")
        questions[39] = q("Explain one advantage of factor form over expanded form in a quadratic or algebraic expression.", "Factor form shows roots or zero-product structure more clearly.", "Hard")
    return build_sets(questions)


def make_linear_sets(spec: ChapterSpec, rng: random.Random, systems: bool = False) -> list[SetBlock]:
    m = rng.randint(2, 6)
    c = rng.randint(-5, 7)
    x1 = rng.randint(-2, 3)
    x2 = x1 + rng.randint(2, 5)
    y1 = m * x1 + c
    y2 = m * x2 + c
    questions = [
        q(f"Find y when y = {m}x + {c} and x = {x1}.", str(y1), "Easy"),
        q(f"State the gradient and y-intercept of y = {m}x + {c}.", f"gradient {m}, intercept {c}", "Easy"),
        q(f"Plot the points ({x1}, {y1}) and ({x2}, {y2}) and describe the line.", "It is a straight line with constant rate of change.", "Easy"),
        q(f"Find the gradient between ({x1}, {y1}) and ({x2}, {y2}).", fmt_fraction(gradient((x1, y1), (x2, y2))), "Medium"),
        q(f"Write the equation of the line through ({x1}, {y1}) with gradient {m}.", f"y = {m}x + {c}", "Medium"),
        q("Explain what the y-intercept tells you in a real-life linear model.", "It is the starting value when x = 0.", "Medium"),
        q(f"A taxi fare is Rs {abs(c) + 50} plus Rs {m * 5} per km. Write a linear rule for a trip of x km.", f"Fare = {m * 5}x + {abs(c) + 50}", "Medium"),
        q(f"Find x when {m}x + {c} = {y2}.", str(x2), "Medium"),
        q(f"In '{spec.title}', explain one reason a straight-line model may not fit every real data set.", "A strong answer mentions changing rates or limited ranges.", "Hard"),
        q("State one sign on a graph that a relationship is not linear.", "The graph curves or the rate of change is not constant.", "Hard"),
        q(f"Make a table of values for y = {m}x + {c} for x = -1, 0, 1, 2.", "Substitute each x-value into the rule.", "Easy"),
        q(f"Which line is steeper: y = {m}x + 1 or y = {m + 2}x - 3?", f"y = {m + 2}x - 3", "Easy"),
        q(f"Find the x-intercept of y = {m}x + {c}.", f"x = {-c / m}", "Medium"),
        q("Explain the meaning of constant rate of change.", "For each equal change in x, y changes by the same amount.", "Easy"),
        q(f"A tank starts with {abs(c) + 20} L and fills at {m} L per minute. How much water is there after 12 minutes?", str(abs(c) + 20 + 12 * m), "Medium"),
        q("Describe one difference between solving a linear equation and reading a value from a linear graph.", "Equations are solved symbolically; graphs are interpreted visually.", "Medium"),
        q(f"Write the equation of a line parallel to y = {m}x + {c}.", f"Any line of the form y = {m}x + k is accepted.", "Medium"),
        q(f"Write the equation of a line perpendicular to y = {m}x + {c}.", f"Any line with gradient -1/{m} is accepted.", "Hard"),
        q("Explain why tables, graphs and equations can describe the same relationship.", "They are different representations of the same rule.", "Medium"),
        q("Create a short contextual problem that could be represented by a linear graph and describe the variables.", "Any sensible context with a constant rate is accepted.", "Hard"),
        q(f"Find y when x = 0 for y = {m}x + {c}.", str(c), "Easy"),
        q(f"Find the midpoint of ({x1}, {y1}) and ({x2}, {y2}).", f"({fmt_fraction(midpoint((x1, y1), (x2, y2))[0])}, {fmt_fraction(midpoint((x1, y1), (x2, y2))[1])})", "Medium"),
        q(f"A streaming plan charges Rs {abs(c) + 100} plus Rs {m * 3} per movie. How many movies can be watched for Rs {abs(c) + 100 + 9 * m * 3}?", "9", "Medium"),
        q("State one advantage of finding an equation from two points instead of guessing from a graph.", "It gives an exact rule.", "Hard"),
        q(f"Compare the gradients of y = {m}x + {c} and y = {-m}x + {c}.", "They are equal in magnitude but opposite in sign.", "Medium"),
        q("Explain how the sign of the gradient changes the direction of a line.", "Positive rises from left to right; negative falls from left to right.", "Easy"),
        q(f"Find the gradient of a horizontal line.", "0", "Easy"),
        q(f"Find the gradient of the line through ({x1}, {y1}) and ({x1}, {y1 + 4}).", "Undefined", "Hard"),
        q("Write one reason linear models are often the first model tested in a practical situation.", "They are simple and useful when the rate of change is approximately constant.", "Hard"),
        q(f"Which point lies on y = {m}x + {c}: ({x2}, {y2}) or ({x2}, {y2 + 1})?", f"({x2}, {y2})", "Easy"),
        q(f"Solve {m}x + {c} = {m * 7 + c}.", "7", "Medium"),
        q("Describe one situation where a linear graph should start at x = 0 and one where it should not.", "Any sensible pair of examples is accepted.", "Hard"),
        q(f"Find a rule for a sequence with first term {c + m} and common difference {m}.", f"nth term = {m}n + {c}", "Medium"),
        q(f"Explain why lines with the same gradient never meet, if they have different intercepts.", "They rise at the same rate and stay a fixed distance apart.", "Medium"),
        q(f"Find the distance along the x-axis between the points x = {x1} and x = {x2}.", str(abs(x2 - x1)), "Easy"),
        q("State one graphical sign that two linear models have the same starting value.", "They cross the y-axis at the same point.", "Easy"),
        q(f"Use substitution to check whether x = {x2} solves y = {m}x + {c} when y = {y2}.", "Yes, substituting gives the stated y-value.", "Medium"),
        q("Write one exam-style check you could use after drawing a straight-line graph.", "Check at least two plotted points against the equation.", "Medium"),
        q(f"A membership plan costs Rs {abs(c) + 200} plus Rs {m * 10} per visit. Write the cost after n visits.", f"Cost = {m * 10}n + {abs(c) + 200}", "Medium"),
        q("Explain one limitation of using a linear model far outside the data range.", "Extrapolation may not remain realistic.", "Hard"),
    ]
    if systems:
        questions[4] = q("Solve the system x + y = 10 and x - y = 2.", "x = 6, y = 4", "Medium")
        questions[7] = q("Solve 2x + y = 11 and x - y = 1.", "x = 4, y = 3", "Medium")
        questions[17] = q("Explain what the point of intersection means for two linear graphs.", "It is the pair of values that satisfies both equations.", "Medium")
        questions[23] = q("A cinema sells adult tickets for Rs 180 and child tickets for Rs 120. If 14 tickets cost Rs 2160, set up a system.", "a + c = 14 and 180a + 120c = 2160", "Hard")
        questions[39] = q("State one reason elimination may be quicker than graphing for a system.", "It can give an exact answer without reading scale values.", "Hard")
    return build_sets(questions)


def make_matrix_sets(spec: ChapterSpec, rng: random.Random) -> list[SetBlock]:
    questions = [
        q("State the order of the matrix [[2, 3], [4, 5]].", "2 x 2", "Easy"),
        q("Add [[1, 2], [3, 4]] and [[5, 6], [7, 8]].", "[[6, 8], [10, 12]]", "Easy"),
        q("Subtract [[4, 5], [6, 7]] from [[9, 8], [7, 6]].", "[[5, 3], [1, -1]]", "Easy"),
        q("Multiply 3 by [[2, -1], [4, 0]].", "[[6, -3], [12, 0]]", "Easy"),
        q("Find the product [[1, 2], [0, 1]] x [[3], [4]].", "[[11], [4]]", "Medium"),
        q("Explain when two matrices can be added.", "They must have the same order.", "Easy"),
        q("Find the determinant of [[2, 1], [5, 3]].", "1", "Medium"),
        q("State one reason matrix multiplication is not commutative in general.", "AB and BA can give different results or one may be undefined.", "Hard"),
        q(f"In '{spec.title}', explain one way matrices help organise information.", "A strong answer mentions structured rows and columns or transformations.", "Medium"),
        q("Describe one real-life use of matrices.", "Any sensible example such as timetables, networks or transformations is accepted.", "Hard"),
        q("Multiply [[2, 0], [1, 3]] by [[1, 4], [2, 5]].", "[[2, 8], [7, 19]]", "Medium"),
        q("Can a 2 x 3 matrix be added to a 3 x 2 matrix? Explain.", "No, their orders differ.", "Easy"),
        q("Write the identity matrix of order 2.", "[[1, 0], [0, 1]]", "Easy"),
        q("Explain what multiplying a matrix by a column vector can represent geometrically.", "It can describe a transformation or a system of combined effects.", "Hard"),
        q("Find the inverse of [[1, 0], [0, 1]].", "[[1, 0], [0, 1]]", "Easy"),
        q("State one condition required for a 2 x 2 matrix to have an inverse.", "Its determinant must be non-zero.", "Medium"),
        q("Use a matrix to represent ticket sales for 2 shows with adult and child tickets.", "Any valid 2 x 2 or 2 x 1 setup is accepted.", "Medium"),
        q("Explain the role of rows and columns in matrix multiplication.", "Rows of the first matrix combine with columns of the second matrix.", "Medium"),
        q("Find [[1, 2], [3, 4]] x [[0], [1]].", "[[2], [4]]", "Easy"),
        q("Create a short problem where a matrix helps compare two groups and two categories.", "Any correct self-created context is accepted.", "Hard"),
        q("State whether [[2, 3]] is a row matrix or a column matrix.", "Row matrix", "Easy"),
        q("State whether [[2], [3]] is a row matrix or a column matrix.", "Column matrix", "Easy"),
        q("Find the determinant of [[4, 1], [2, 3]].", "10", "Medium"),
        q("Explain why the zero matrix is useful in matrix equations.", "It acts like the additive identity.", "Medium"),
        q("If A = [[1, 2], [3, 4]], find A + I where I is the identity matrix.", "[[2, 2], [3, 5]]", "Medium"),
        q("Describe one careful checking step after multiplying two matrices.", "Check the orders first and then verify each entry by row-column products.", "Hard"),
        q("Can a 2 x 2 matrix be multiplied by a 2 x 1 matrix? Explain.", "Yes, the inner dimensions match.", "Easy"),
        q("Write a 2 x 2 matrix with determinant 0.", "Any valid example such as [[1, 2], [2, 4]] is accepted.", "Medium"),
        q("Explain why determinant 0 means a matrix is singular.", "It has no inverse.", "Hard"),
        q("Find 2A if A = [[-1, 3], [2, 5]].", "[[-2, 6], [4, 10]]", "Easy"),
        q("Use one sentence to compare matrix addition and matrix multiplication.", "Addition combines matching entries; multiplication combines rows and columns.", "Medium"),
        q("State one place where matrix notation is more efficient than writing repeated tables in words.", "Any sensible data-organisation example is accepted.", "Hard"),
        q("If A is 3 x 2 and B is 2 x 4, what is the order of AB?", "3 x 4", "Medium"),
        q("If A is 3 x 2 and B is 2 x 4, is BA defined?", "No, because 4 and 3 do not match.", "Medium"),
        q("Find [[2, 1], [0, 1]] x [[1, 0], [0, 1]].", "[[2, 1], [0, 1]]", "Easy"),
        q("Explain why matrix models are useful for repeating the same calculation pattern many times.", "They package a whole system of relationships into one structure.", "Hard"),
        q("Write one reason learners should always track matrix order carefully.", "The order controls whether operations are valid and what the result means.", "Medium"),
        q("Describe one connection between matrices and geometric transformations.", "Matrices can encode rotations, reflections, stretches or other linear transformations.", "Hard"),
        q("Give one example of two matrices that can be added but not multiplied in one order.", "Any valid example with a clear explanation is accepted.", "Hard"),
        q("State one benefit of checking a matrix result with dimensions before checking the entries.", "It catches impossible operations early.", "Medium"),
    ]
    return build_sets(questions)


def make_quadratic_sets(spec: ChapterSpec, rng: random.Random) -> list[SetBlock]:
    a = rng.randint(1, 3)
    p = rng.randint(2, 6)
    qv = rng.randint(1, 5)
    questions = [
        q(f"Expand (x + {p})(x + {qv}).", f"x^2 + {p + qv}x + {p * qv}", "Easy"),
        q(f"Factorise x^2 + {p + qv}x + {p * qv}.", f"(x + {p})(x + {qv})", "Easy"),
        q(f"Solve x^2 - {p + qv}x + {p * qv} = 0.", f"x = {p} or x = {qv}", "Medium"),
        q("State what the roots of a quadratic are.", "They are the x-values where the quadratic equals zero.", "Easy"),
        q(f"Find the axis of symmetry of y = x^2 - {2 * p}x + 3.", f"x = {p}", "Medium"),
        q("Explain one difference between factor form and expanded form.", "Factor form shows roots clearly; expanded form shows coefficients directly.", "Medium"),
        q(f"Find the vertex of y = (x - {p})^2 + {qv}.", f"({p}, {qv})", "Medium"),
        q("How many x-intercepts can a quadratic graph have?", "0, 1 or 2", "Easy"),
        q(f"In '{spec.title}', explain why more than one form of a quadratic can be useful.", "A strong answer links different forms to different features or tasks.", "Hard"),
        q("State one clue from a graph that a relation is quadratic, not linear.", "It forms a parabola rather than a straight line.", "Easy"),
        q(f"Solve x^2 = {p * p}.", f"x = {p} or x = -{p}", "Easy"),
        q(f"Expand (x - {p})^2.", f"x^2 - {2 * p}x + {p * p}", "Medium"),
        q(f"Factorise x^2 - {p * p}.", f"(x - {p})(x + {p})", "Medium"),
        q(f"Evaluate y = x^2 - {p + qv}x + {p * qv} when x = {p}.", "0", "Medium"),
        q("Explain what the turning point tells you about a quadratic graph.", "It gives the maximum or minimum point.", "Medium"),
        q(f"Sketch or describe the graph of y = x^2 + {qv}.", "It is the basic parabola shifted up by the stated amount.", "Medium"),
        q(f"Find two numbers that multiply to {p * qv} and add to {p + qv}.", f"{p} and {qv}", "Easy"),
        q("State one reason completing the square can be useful.", "It reveals the vertex form clearly.", "Hard"),
        q("Create a simple quadratic equation with roots 2 and -5.", "(x - 2)(x + 5) = 0 or equivalent", "Hard"),
        q("Explain how the sign of the x^2 coefficient changes the graph.", "Positive opens upwards; negative opens downwards.", "Easy"),
        q(f"Find the y-intercept of y = x^2 - {p}x + {qv}.", str(qv), "Easy"),
        q(f"Solve x(x - {p}) = 0.", f"x = 0 or x = {p}", "Easy"),
        q(f"State whether y = -x^2 + 4x - 1 has a maximum or minimum point.", "Maximum", "Medium"),
        q("Explain why a quadratic can model area or projectile situations.", "The relationship can involve a squared term and curved change.", "Hard"),
        q(f"Factorise {a}x^2 + {a * (p + qv)}x + {a * p * qv}.", f"{a}(x + {p})(x + {qv})", "Hard"),
        q(f"Find the value of k if x = 3 is a root of x^2 - 7x + k = 0.", "12", "Hard"),
        q("State one way to check roots after solving a quadratic.", "Substitute each value back into the original equation.", "Medium"),
        q(f"Write a quadratic in vertex form with turning point ({p}, {-qv}).", f"y = (x - {p})^2 - {qv}", "Hard"),
        q("Describe one mistake learners make when factorising quadratics.", "A common error is choosing numbers with the right product but wrong sum.", "Medium"),
        q(f"Find the discriminant of x^2 - {p + qv}x + {p * qv}.", str((p + qv) ** 2 - 4 * p * qv), "Hard"),
        q("Explain what a discriminant tells you.", "It tells you how many real roots the quadratic has.", "Hard"),
        q(f"Evaluate (2x - 3)(x + 4) and simplify.", "2x^2 + 5x - 12", "Medium"),
        q(f"Write a quadratic with double root x = {p}.", f"(x - {p})^2 = 0 or equivalent", "Hard"),
        q("State one reason a graphing approach can support an algebraic approach to quadratics.", "The graph helps visualise roots and turning points.", "Medium"),
        q(f"Find the minimum value of y = (x - {p})^2 + {qv}.", str(qv), "Medium"),
        q("Write one context where the x-intercepts of a quadratic matter.", "Any sensible context such as height-time or profit-loss is accepted.", "Hard"),
        q(f"Compare y = x^2 and y = x^2 + {qv}. What changed?", f"The graph shifted up by {qv}.", "Easy"),
        q(f"Solve x^2 + {2 * p}x + {p * p} = 0.", f"x = -{p}", "Medium"),
        q("Explain why factorising is not always possible over the integers.", "Some quadratics have irrational or non-integer roots.", "Hard"),
        q("State one revision check that helps after solving a quadratic equation.", "Check both solutions and their signs by substitution.", "Medium"),
    ]
    return build_sets(questions)


def make_function_sets(spec: ChapterSpec, rng: random.Random, mode: str) -> list[SetBlock]:
    a = rng.randint(2, 5)
    b = rng.randint(1, 6)
    questions = [
        q(f"If f(x) = {a}x + {b}, find f(3).", str(a * 3 + b), "Easy"),
        q("State the difference between a relation and a function.", "A function assigns exactly one output to each input.", "Easy"),
        q("Identify the domain and range of a rule from a mapping diagram you create.", "Any correct mapping example with domain and range is accepted.", "Easy"),
        q(f"If g(x) = x - {b}, find g({a}).", str(a - b), "Easy"),
        q("Explain what function notation means.", "It names the rule and the input clearly, such as f(x).", "Easy"),
        q(f"Find the inverse of f(x) = {a}x + {b}.", f"f^-1(x) = (x - {b})/{a}", "Medium"),
        q(f"Find f(g(5)) if f(x) = {a}x and g(x) = x + {b}.", str(a * (5 + b)), "Medium"),
        q("Explain why not every relation has an inverse function.", "Some relations are not one-to-one or not functions to begin with.", "Medium"),
        q(f"In '{spec.title}', describe one situation where a function model is more useful than a simple table.", "A strong answer mentions prediction or generalisation.", "Hard"),
        q("State one graph test that can show whether a graph represents a function.", "The vertical line test.", "Medium"),
        q(f"If h(x) = x^2 and x = -4, find h(x).", "16", "Easy"),
        q("Explain what the output of a function represents in context.", "It is the dependent value produced by the rule.", "Medium"),
        q("Give one example of a real-life quantity that could be treated as a function of time.", "Any sensible example such as distance, height or population is accepted.", "Easy"),
        q(f"Find f(0) for f(x) = {a}x + {b}.", str(b), "Easy"),
        q("Explain the difference between discrete and continuous domains in a function context.", "Discrete inputs are separate values; continuous inputs fill an interval.", "Hard"),
        q(f"State whether y = {a}x + {b} is linear, quadratic or exponential.", "Linear", "Easy"),
        q("Describe one way a graph can help you understand a function more quickly than an equation alone.", "It shows shape, intercepts and overall behaviour visually.", "Medium"),
        q(f"If p(x) = 2x + 1 and q(x) = x^2, find q(3).", "9", "Easy"),
        q("State one reason the domain may need to be restricted in a practical problem.", "Only some inputs make sense in the context.", "Medium"),
        q("Create a simple function rule of your own and evaluate it for two inputs.", "Any correct self-created function with correct evaluations is accepted.", "Hard"),
        q(f"Find the composite function f(g(x)) if f(x)=2x and g(x)=x+{b}.", f"2x + {2 * b}", "Medium"),
        q("Explain what it means for two functions to be inverses.", "Applying one after the other returns the original input.", "Medium"),
        q(f"If y = 3^x, find y when x = 2.", "9", "Easy"),
        q("Explain why exponential growth is different from linear growth.", "Exponential growth changes by a multiplier; linear growth changes by a constant difference.", "Hard"),
        q(f"Solve 2^x = {2 ** a}.", str(a), "Medium"),
        q("State one logarithm fact that links logs to powers.", "If a^b = c then log_a(c) = b.", "Hard"),
        q(f"Simplify 3^2 x 3^4.", "3^6 = 729", "Medium"),
        q("Describe one real-life example of exponential decay.", "Any sensible example such as cooling, depreciation or radioactive decay is accepted.", "Easy"),
        q(f"Find the domain restriction of r(x) = 1/(x - {b}).", f"x != {b}", "Medium"),
        q("Explain why a rational function can have excluded values.", "Division by zero is undefined.", "Medium"),
        q("State one reason an inverse may not exist unless a function is one-to-one.", "Two different inputs would produce the same output, so the inverse would not know which input to return.", "Hard"),
        q("Write one sentence connecting functions to the chapter title.", "Any relevant sentence about input-output relationships is accepted.", "Hard"),
        q(f"If f(x)=x^2+1, find f(-2).", "5", "Easy"),
        q("Explain what a composite function does in words.", "It applies one function to the result of another.", "Medium"),
        q("State one sign on a graph that a function is not linear.", "The graph curves or changes rate.", "Easy"),
        q(f"Find the inverse of y = x + {b}.", f"y = x - {b}", "Easy"),
        q("Describe one careful check after finding an inverse function.", "Compose the function and its inverse to see whether the result is x.", "Medium"),
        q("Explain why logarithms are useful when a variable appears in an exponent.", "They let the exponent be solved directly.", "Hard"),
        q("Give one reason a function model should be checked against real data.", "The model may not fit perfectly or may only work over part of the domain.", "Hard"),
        q("State one difference between evaluating a function and solving an equation involving a function.", "Evaluating finds an output; solving finds the input that gives a target output.", "Medium"),
    ]
    if mode == "relations":
        questions[5] = q("State whether the relation {(1,2),(2,4),(3,4)} is a function and explain.", "Yes, because each input has only one output.", "Medium")
        questions[10] = q("Give one example of a many-to-one function.", "Any correct example such as f(x)=x^2 is accepted.", "Medium")
    if mode == "advanced":
        questions[22] = q(f"If y = 2 x 3^x, find y when x = 2.", "18", "Medium")
    return build_sets(questions)


def make_geometry_foundation_sets(spec: ChapterSpec, rng: random.Random, mode: str) -> list[SetBlock]:
    questions = [
        q("State the sum of angles on a straight line.", "180 deg", "Easy"),
        q("State the sum of angles around a point.", "360 deg", "Easy"),
        q("Define a perpendicular bisector.", "A line that cuts a segment into two equal parts at 90 degrees.", "Easy"),
        q("Explain what a compass and straightedge construction is meant to show.", "A precise geometric method based on properties, not rough measuring.", "Medium"),
        q("Name one pair of vertically opposite angles and state their relationship.", "They are equal.", "Easy"),
        q("Describe the steps for constructing a perpendicular bisector of a line segment.", "Use equal-radius arcs from each endpoint and join the arc intersections.", "Medium"),
        q("State one reason accurate labels matter in geometry.", "They help communicate which points, lengths or angles are related.", "Medium"),
        q(f"In '{spec.title}', explain one connection between geometry and design or creativity.", "Any relevant connection is accepted.", "Hard"),
        q("Create a simple diagram that includes a line, a ray and a segment, and label them.", "Any correctly labelled example is accepted.", "Medium"),
        q("State one common construction error and how to avoid it.", "Any realistic error with a clear correction is accepted.", "Hard"),
        q("What are complementary angles?", "Two angles that add to 90 deg.", "Easy"),
        q("What are supplementary angles?", "Two angles that add to 180 deg.", "Easy"),
        q("Explain the difference between a regular and an irregular polygon.", "A regular polygon has equal sides and equal angles.", "Easy"),
        q("State the interior angle sum of a triangle.", "180 deg", "Easy"),
        q("Name one real-life object that shows parallel lines.", "Any sensible example is accepted.", "Easy"),
        q("Describe how you would bisect a 60 deg angle using a compass.", "Construct equal arcs and join the vertex to the arc intersection.", "Medium"),
        q("Explain what it means for two lines to be parallel.", "They remain the same distance apart and never meet.", "Easy"),
        q("Find the missing angle if two angles on a straight line are 124 deg and x.", "56 deg", "Easy"),
        q("State one reason formal geometric language improves mathematical communication.", "It makes each relationship precise and checkable.", "Medium"),
        q("Create one question of your own about lines or angles and solve it.", "Any correct self-created example is accepted.", "Hard"),
        q("Name the different types of angle: acute, right, obtuse and reflex.", "Give the correct names with their size ranges.", "Easy"),
        q("Explain how a protractor differs from a compass in geometry work.", "A protractor measures angles; a compass creates equal distances or arcs.", "Easy"),
        q("What does it mean to bisect an angle?", "To divide it into two equal angles.", "Easy"),
        q("State one reason measuring alone is weaker than proving in geometry.", "Measurements can be inaccurate; proof explains why something must be true.", "Hard"),
        q("Find the missing angle if vertically opposite angles are 72 deg and x.", "72 deg", "Easy"),
        q("Describe one way constructions can be checked after they are finished.", "Check equal lengths or right angles using the construction properties.", "Medium"),
        q("Name one geometric tool that supports accurate drawing and one that supports accurate measuring.", "For example, compass and ruler/protractor.", "Easy"),
        q("Explain why two arcs with the same radius matter in a bisector construction.", "They create equal-distance points used to identify the required line.", "Medium"),
        q("State one design task where angle accuracy is important.", "Any sensible example such as roofing, tiling or product design is accepted.", "Hard"),
        q("Find the missing angle if angles around a point are 85 deg, 140 deg and x.", "135 deg", "Medium"),
        q("State one reason learners should write reasons next to angle steps in a proof-style solution.", "It makes the chain of logic visible.", "Hard"),
        q("Explain what a transversal is.", "A line that cuts across two other lines.", "Medium"),
        q("Name a polygon with 8 sides.", "Octagon", "Easy"),
        q("Describe one feature of a regular hexagon.", "Any correct property such as 6 equal sides is accepted.", "Easy"),
        q("State the sum of the interior angles of a quadrilateral.", "360 deg", "Easy"),
        q("Explain one way parallel lines appear in architecture or art.", "Any relevant example is accepted.", "Hard"),
        q("Describe how to construct a 90 deg angle at a point on a line.", "A correct compass-and-straightedge description is accepted.", "Medium"),
        q("Write one revision tip for a geometry-construction chapter.", "Any practical tip about labelling, accuracy or stating reasons is accepted.", "Medium"),
        q("State one difference between a line and a line segment.", "A line extends forever; a segment has two endpoints.", "Easy"),
        q("Explain why diagrams should support, not replace, written reasoning.", "A diagram suggests relationships, but written reasons justify them clearly.", "Hard"),
    ]
    if mode == "polygons":
        questions[4] = q("Find the sum of the interior angles of a hexagon.", "720 deg", "Easy")
        questions[5] = q("Find one interior angle of a regular octagon.", "135 deg", "Medium")
        questions[17] = q("State the exterior angle of a regular pentagon.", "72 deg", "Medium")
        questions[32] = q("Explain why the exterior angles of any polygon sum to 360 deg.", "Walking around the polygon completes one full turn.", "Hard")
    if mode == "lines":
        questions[4] = q("Two corresponding angles are formed by parallel lines and a transversal. If one is 68 deg, find the other.", "68 deg", "Easy")
        questions[17] = q("If alternate interior angles are equal, what can you conclude about the lines?", "The lines are parallel.", "Medium")
    return build_sets(questions)


def make_transformation_sets(spec: ChapterSpec, rng: random.Random) -> list[SetBlock]:
    questions = [
        q("Describe a translation by the vector (3, -2).", "Move 3 units right and 2 units down.", "Easy"),
        q("State what a reflection in the x-axis does to a point (x, y).", "It becomes (x, -y).", "Easy"),
        q("State what a reflection in the y-axis does to a point (x, y).", "It becomes (-x, y).", "Easy"),
        q("Describe a rotation of 90 deg clockwise about the origin.", "Use the coordinate rule or a diagram to show the new image.", "Medium"),
        q("What does an enlargement with scale factor 2 do?", "It doubles all distances from the centre of enlargement.", "Easy"),
        q("Explain which transformations preserve length exactly.", "Translations, reflections and rotations do.", "Medium"),
        q("Find the image of (2, 3) after a translation by (-4, 1).", "(-2, 4)", "Easy"),
        q("Explain the difference between congruent and similar images.", "Congruent images keep size and shape; similar images keep shape but not necessarily size.", "Medium"),
        q(f"In '{spec.title}', describe one cultural or design pattern that could be analysed with transformations.", "Any sensible example is accepted.", "Hard"),
        q("State one common error when reflecting a point in an axis.", "Changing the wrong coordinate sign.", "Hard"),
        q("Find the image of (-1, 4) after reflection in the x-axis.", "(-1, -4)", "Easy"),
        q("Find the image of (5, -2) after reflection in the y-axis.", "(-5, -2)", "Easy"),
        q("Describe a half-turn about the origin.", "A 180 deg rotation about the origin.", "Easy"),
        q("Explain why a rotation needs a centre, an angle and a direction.", "All three are needed to describe the movement uniquely.", "Medium"),
        q("State what stays the same after a translation.", "Shape, size and orientation stay the same.", "Easy"),
        q("Find the image of (1, 2) after an enlargement of scale factor 3 from the origin.", "(3, 6)", "Medium"),
        q("Explain what the centre of enlargement controls.", "It fixes the point from which all distances are scaled.", "Medium"),
        q("Describe how to recognise a reflection from a before-and-after diagram.", "Each point and its image are the same distance from the mirror line on opposite sides.", "Medium"),
        q("State one reason coordinate rules are helpful in transformations.", "They make the movement exact and repeatable.", "Medium"),
        q("Create a simple transformation question of your own and solve it.", "Any correct self-created problem and solution are accepted.", "Hard"),
        q("Which transformation changes orientation but not size: reflection or translation?", "Reflection", "Easy"),
        q("State whether an enlargement with scale factor 1 changes a figure.", "No", "Easy"),
        q("Explain one way two transformations can be combined to make a design pattern.", "Any valid example is accepted.", "Hard"),
        q("Find the image of (4, 0) after a 180 deg rotation about the origin.", "(-4, 0)", "Easy"),
        q("State one transformation that can take any point to itself besides doing nothing to the whole figure.", "A reflection if the point lies on the mirror line, or a rotation about that point in special cases.", "Hard"),
        q("Explain why a mirror line is part of the description of a reflection.", "Without it the image is not determined.", "Medium"),
        q("Find the image of (0, -3) after translation by (2, 5).", "(2, 2)", "Easy"),
        q("State one difference between rigid transformations and enlargements.", "Rigid transformations preserve size; enlargements change size.", "Easy"),
        q("Describe one use of transformations in art, logos or architecture.", "Any sensible application is accepted.", "Medium"),
        q("Explain why corresponding sides stay parallel after a translation.", "All points move by the same vector.", "Hard"),
        q("A shape is reflected in y = x. State what happens to coordinates (x, y).", "(y, x)", "Hard"),
        q("State one check you can do after plotting an image under a transformation.", "Check distances, orientation or the vector/rule used.", "Medium"),
        q("Find the image of (3, -1) after a translation by (-3, 4).", "(0, 3)", "Easy"),
        q("Explain how symmetry is related to reflection.", "Reflection symmetry means one half is the mirror image of the other.", "Medium"),
        q("State whether a rotation preserves area.", "Yes", "Easy"),
        q("Describe the line that stays fixed under reflection in the x-axis.", "The x-axis", "Easy"),
        q("Write one reason enlargement problems need scale factor and centre together.", "Both size change and position depend on them.", "Hard"),
        q("Explain one benefit of graph paper when learning transformations.", "It helps measure equal movement and plot coordinates accurately.", "Medium"),
        q("State whether a figure enlarged by scale factor -1 is a standard MYP transformation description you would usually use, and why.", "It can be interpreted as a 180 deg rotation with scale 1 in many school contexts; clarify conventions.", "Hard"),
        q("Describe one exam-style mistake to avoid in a transformation question.", "Any practical plotting or labelling mistake with a fix is accepted.", "Medium"),
    ]
    return build_sets(questions)


def make_triangle_similarity_sets(spec: ChapterSpec, rng: random.Random, mode: str) -> list[SetBlock]:
    questions = [
        q("State the angle sum of a triangle.", "180 deg", "Easy"),
        q("A triangle has angles 50 deg, 60 deg and x. Find x.", "70 deg", "Easy"),
        q("State one property of an isosceles triangle.", "It has two equal sides and two equal base angles.", "Easy"),
        q("Find the hypotenuse of a right triangle with legs 3 and 4.", "5", "Easy"),
        q("Explain what congruent triangles have in common.", "They are the same size and shape.", "Easy"),
        q("State one congruence test for triangles.", "Any of SSS, SAS, ASA or RHS.", "Medium"),
        q("Explain what similar triangles have in common.", "They have equal corresponding angles and proportional corresponding sides.", "Medium"),
        q(f"In '{spec.title}', describe one practical reason triangles are used in structures.", "A strong answer mentions strength or stability.", "Hard"),
        q("State one common error when using scale factor in similar triangles.", "Using the scale factor in the wrong direction.", "Hard"),
        q("Create one triangle question of your own and solve it.", "Any correct self-created problem and solution are accepted.", "Hard"),
        q("If two angles of a triangle are equal, what can you say about the opposite sides?", "The opposite sides are equal.", "Medium"),
        q("State the exterior angle theorem for triangles.", "An exterior angle equals the sum of the two opposite interior angles.", "Medium"),
        q("Find the area of a triangle with base 10 cm and height 7 cm.", "35 cm^2", "Easy"),
        q("State one way to recognise a right triangle from side lengths alone.", "Check whether the side lengths satisfy Pythagoras.", "Medium"),
        q("Explain why similar shapes can have different areas even when they look alike.", "Area changes with the square of the scale factor.", "Hard"),
        q("A triangle has sides 5, 5 and 8. Name the type of triangle by sides.", "Isosceles", "Easy"),
        q("State whether triangles with angles 30 deg, 60 deg, 90 deg and 40 deg, 60 deg, 80 deg are similar.", "No", "Medium"),
        q("If two triangles are congruent, what can you say about corresponding lengths?", "They are equal.", "Easy"),
        q("Explain the difference between proof by measurement and proof by property in triangle work.", "Measurement suggests; property-based proof justifies exactly.", "Hard"),
        q("Find the missing angle in an equilateral triangle.", "60 deg", "Easy"),
        q("A scale model uses factor 3. If one side is 4 cm on the original, what is the image side?", "12 cm", "Easy"),
        q("If the scale factor between similar triangles is 2, how does the area scale?", "By a factor of 4", "Medium"),
        q("State one clue that two triangles might be congruent but not similar-only.", "All corresponding side lengths match exactly, not just proportionally.", "Medium"),
        q("Explain why right triangles are often used with Pythagoras or trigonometry.", "Their special angle-side relationships are easy to model.", "Medium"),
        q("Find the third side if a right triangle has hypotenuse 13 and one leg 5.", "12", "Medium"),
        q("State one reason triangle proofs often start by identifying equal angles or equal sides.", "Those facts unlock congruence or similarity relationships.", "Hard"),
        q("A triangle has sides 7, 8 and 9. Is it scalene, isosceles or equilateral?", "Scalene", "Easy"),
        q("Explain one real-life use of similar triangles.", "Any sensible example such as shadows, maps or models is accepted.", "Medium"),
        q("State the ratio of corresponding perimeters of similar figures with scale factor 5.", "5:1 or 5 depending on direction", "Medium"),
        q("Write one checking strategy after solving a triangle-angle problem.", "Use the angle sum or a property check.", "Medium"),
        q("Describe one reason a triangle is the simplest polygon for proof work.", "It has the fewest sides and very strong fixed angle relationships.", "Hard"),
        q("A triangle has angles 35 deg and 95 deg. Find the third angle.", "50 deg", "Easy"),
        q("State whether SSS proves similarity or congruence when all sides match exactly.", "Congruence", "Medium"),
        q("Explain why mirror-image triangles can still be congruent.", "Congruence allows reflections as rigid transformations.", "Medium"),
        q("A model triangle is half the side lengths of the original. What is the scale factor from original to model?", "1/2", "Easy"),
        q("Find the area scale factor when the side scale factor is 3.", "9", "Medium"),
        q("Write one sentence linking triangle reasoning to your chapter title.", "Any relevant sentence is accepted.", "Hard"),
        q("State whether AAA alone proves congruence or similarity.", "Similarity", "Medium"),
        q("Explain one danger of judging triangle relationships from a rough sketch only.", "A sketch can be misleading unless properties are stated or proved.", "Hard"),
        q("Name one kind of triangle that always has exactly two equal sides.", "Isosceles triangle", "Easy"),
    ]
    if mode == "congruency":
        questions[6] = q("State why equal corresponding sides and angles matter in congruency.", "They show the figures match exactly under a rigid transformation.", "Medium")
        questions[21] = q("Which congruence test uses a right angle, hypotenuse and one other side?", "RHS", "Medium")
        questions[32] = q("Explain why ASA proves congruence, not just similarity, when one included side also matches by implication.", "The size is fixed, not just the shape.", "Hard")
    if mode == "similarity":
        questions[4] = q("Explain what corresponding sides in similar triangles have in common.", "They are in the same ratio.", "Easy")
        questions[17] = q("If one triangle side is 6 and the corresponding similar side is 15, what is the scale factor?", "2.5", "Medium")
    return build_sets(questions)


def make_measurement_sets(spec: ChapterSpec, rng: random.Random, mode: str) -> list[SetBlock]:
    questions = [
        q("Find the perimeter of a rectangle with length 14 cm and width 9 cm.", "46 cm", "Easy"),
        q("Find the area of the same rectangle.", "126 cm^2", "Easy"),
        q("Find the volume of a cuboid 8 cm by 5 cm by 4 cm.", "160 cm^3", "Easy"),
        q("State one reason units matter in measurement.", "Without units the answer can be misunderstood.", "Easy"),
        q("Convert 2.5 m to cm.", "250 cm", "Easy"),
        q("Find the area of a triangle with base 12 cm and height 9 cm.", "54 cm^2", "Medium"),
        q("Find the circumference of a circle with radius 7 cm using pi = 22/7.", "44 cm", "Medium"),
        q("Find the volume of a cylinder with radius 3 cm and height 10 cm in terms of pi.", "90pi cm^3", "Medium"),
        q(f"In '{spec.title}', explain one way measurement decisions affect design or environmental choices.", "Any relevant explanation is accepted.", "Hard"),
        q("State one common mistake when finding area from perimeter information.", "Using perimeter values as though they were side lengths without further reasoning.", "Hard"),
        q("Convert 1500 mL to litres.", "1.5 L", "Easy"),
        q("Find the area of a circle with radius 7 cm using pi = 22/7.", "154 cm^2", "Medium"),
        q("State one difference between area and volume.", "Area measures surface; volume measures space filled.", "Easy"),
        q("Find the total surface area of a cube of side 5 cm.", "150 cm^2", "Medium"),
        q("Explain why a net can help with surface-area reasoning.", "It opens the solid into visible faces that can be added.", "Medium"),
        q("A tank holds 2.4 L. How many millilitres is that?", "2400 mL", "Easy"),
        q("Find the area of a trapezium with parallel sides 8 cm and 12 cm and height 5 cm.", "50 cm^2", "Hard"),
        q("State one reason to estimate before calculating an area or volume.", "It helps check whether the exact answer is reasonable.", "Medium"),
        q("Describe one real-life object that is well modelled by a cylinder.", "Any sensible example is accepted.", "Easy"),
        q("Create one measurement word problem of your own and solve it.", "Any correct self-created problem and solution are accepted.", "Hard"),
        q("Find the diagonal of a 3 by 4 rectangle.", "5", "Medium"),
        q("State one reason capacity and volume are closely related.", "Both measure how much three-dimensional space is available.", "Medium"),
        q("A box measures 20 cm by 15 cm by 10 cm. Find its volume.", "3000 cm^3", "Easy"),
        q("Explain when a composite area method is needed.", "When a shape can be split into simpler known shapes.", "Medium"),
        q("Find the area of a semicircle of radius 7 cm using pi = 22/7.", "77 cm^2", "Hard"),
        q("State the number of faces, edges and vertices of a cube.", "6 faces, 12 edges, 8 vertices", "Easy"),
        q("Explain one reason mass and volume are not the same idea.", "Two equal volumes can have different mass depending on the material.", "Medium"),
        q("Find the volume of a prism with cross-sectional area 18 cm^2 and length 11 cm.", "198 cm^3", "Medium"),
        q("Describe one benefit of drawing a labelled diagram before solving a measurement problem.", "It helps organise dimensions, units and required formulas.", "Medium"),
        q("State one unit you would choose for the volume of a swimming pool and one for a medicine bottle.", "For example m^3 and mL.", "Hard"),
        q("Find the area of a square of side 13 cm.", "169 cm^2", "Easy"),
        q("Explain why scaling a shape by factor 2 changes area by factor 4.", "Area depends on two dimensions, each doubled.", "Hard"),
        q("Find the perimeter of a semicircle of radius 7 cm using pi = 22/7.", "36 cm", "Hard"),
        q("State one reason surface area matters in packaging.", "It affects how much material is required.", "Medium"),
        q("Convert 0.75 kg to grams.", "750 g", "Easy"),
        q("Explain one common slip when using volume formulas.", "Mixing dimensions or forgetting cubic units.", "Medium"),
        q("Write one question you would ask yourself to check a volume answer.", "Any practical check about units, size or reasonableness is accepted.", "Medium"),
        q("A water bottle holds 1.2 L. How many such bottles fill a 12 L container?", "10", "Easy"),
        q("State one reason a sphere and a cube with the same height do not have the same volume formula.", "They have different geometric structure.", "Hard"),
        q("Describe one way measurement supports fair comparison of design options.", "It gives a numerical basis for comparing cost, space or efficiency.", "Hard"),
    ]
    if mode == "solids":
        questions[1] = q("State the number of faces, edges and vertices of a triangular prism.", "5 faces, 9 edges, 6 vertices", "Easy")
        questions[6] = q("Describe what a net of a solid shows.", "It shows all the faces laid flat in two dimensions.", "Easy")
    if mode == "length_area":
        questions[7] = q("Find the area of a parallelogram with base 9 cm and height 6 cm.", "54 cm^2", "Medium")
    if mode == "volume_capacity_mass":
        questions[4] = q("Convert 3.2 L to mL.", "3200 mL", "Easy")
        questions[26] = q("A 2 L container is filled to 35%. How much liquid is inside?", "700 mL", "Medium")
    if mode == "geometry_3d_advanced":
        questions[17] = q("State one reason cross-sections are useful in 3D geometry.", "They reveal hidden shape structure.", "Medium")
        questions[24] = q("Describe one method for finding the volume of a composite solid.", "Split it into simpler solids, find each volume and combine appropriately.", "Hard")
    return build_sets(questions)


def make_coordinate_sets(spec: ChapterSpec, rng: random.Random, vectors: bool = False) -> list[SetBlock]:
    p1 = (rng.randint(-4, 2), rng.randint(-3, 4))
    p2 = (p1[0] + rng.randint(2, 6), p1[1] + rng.randint(1, 5))
    g = gradient(p1, p2)
    mid = midpoint(p1, p2)
    questions = [
        q(f"Plot the point {p1} and state its quadrant if applicable.", "Use the signs of x and y to identify the quadrant.", "Easy"),
        q(f"Find the midpoint of {p1} and {p2}.", f"({fmt_fraction(mid[0])}, {fmt_fraction(mid[1])})", "Medium"),
        q(f"Find the gradient of the line through {p1} and {p2}.", fmt_fraction(g), "Medium"),
        q(f"Find the distance squared between {p1} and {p2}.", str(distance_squared(p1, p2)), "Medium"),
        q("State what the gradient of a line tells you.", "It tells you the rate of change or steepness.", "Easy"),
        q(f"Write the equation of the line through {p1} and {p2}.", "Use y = mx + c with the calculated gradient and intercept.", "Hard"),
        q("Explain the difference between horizontal and vertical lines using coordinates.", "Horizontal lines have constant y; vertical lines have constant x.", "Easy"),
        q(f"In '{spec.title}', explain one reason coordinates make geometric communication precise.", "Any strong explanation about location or comparison is accepted.", "Hard"),
        q("State one common gradient mistake and how to avoid it.", "A common error is mixing the order of subtraction; keep point order consistent.", "Hard"),
        q("Create a short coordinate-geometry question of your own and solve it.", "Any correct self-created example is accepted.", "Hard"),
        q(f"Find the point reached from {p1} by moving 3 units right and 2 units up.", f"({p1[0] + 3}, {p1[1] + 2})", "Easy"),
        q("State the gradient of a horizontal line.", "0", "Easy"),
        q("State whether the points (1,2), (2,4) and (3,6) lie on a straight line.", "Yes", "Medium"),
        q("Explain why equal gradients indicate parallel lines.", "The lines rise at the same rate.", "Medium"),
        q(f"Find the midpoint of (-2, 6) and (4, 0).", "(1, 3)", "Easy"),
        q("State one use of midpoint in geometry.", "Any sensible example such as centre, balance or bisector reasoning is accepted.", "Medium"),
        q(f"Find the distance between (0,0) and (6,8).", "10", "Medium"),
        q("Explain why distance and gradient are different geometric ideas.", "Distance measures length; gradient measures steepness or rate of change.", "Medium"),
        q("State one check you can do after finding a midpoint.", "The midpoint should be halfway in both x and y directions.", "Medium"),
        q("Describe one context where coordinates help model movement or position.", "Any sensible example is accepted.", "Hard"),
        q(f"Write the vector from {p1} to {p2}.", f"({p2[0] - p1[0]}, {p2[1] - p1[1]})", "Medium"),
        q("State what it means for two points to have the same x-coordinate.", "They lie on a vertical line.", "Easy"),
        q("State what it means for two points to have the same y-coordinate.", "They lie on a horizontal line.", "Easy"),
        q(f"Find the image of {p1} after translation by vector (2, -3).", f"({p1[0] + 2}, {p1[1] - 3})", "Easy"),
        q("Explain why coordinate methods are useful for proving a shape is a parallelogram.", "You can compare gradients, distances or midpoints exactly.", "Hard"),
        q(f"Find the gradient of the line through (2, 5) and (6, 13).", "2", "Easy"),
        q("State one reason squared distance can still be useful before taking a square root.", "It can compare lengths without extra calculation.", "Medium"),
        q("Describe how to tell from an equation y = mx + c where the line crosses the y-axis.", "The intercept is c.", "Easy"),
        q("Write one sentence connecting coordinate geometry to the chapter title.", "Any relevant sentence is accepted.", "Hard"),
        q(f"Find c if the line y = 3x + c passes through (2, 11).", "5", "Hard"),
        q("Explain one difference between a position vector and a gradient.", "A position vector gives location from an origin; a gradient compares vertical and horizontal change.", "Medium"),
        q("State one strategy for sketching a line accurately from its equation.", "Plot the intercept and another point from the gradient or rule.", "Medium"),
        q(f"Find the point halfway between (8, -2) and (2, 4).", "(5, 1)", "Medium"),
        q("Explain why a vertical line does not have a defined gradient.", "The run is zero, so the division is undefined.", "Hard"),
        q("State one practical application of coordinate geometry.", "Any sensible example such as maps, screens or design is accepted.", "Easy"),
        q(f"Find the vector from (1, 1) to (4, 7).", "(3, 6)", "Easy"),
        q("Explain one checking step after writing an equation of a line from two points.", "Substitute both points into the equation.", "Medium"),
        q("State one way midpoint can identify the centre of a segment in design work.", "It locates the exact centre between endpoints.", "Easy"),
        q("Describe one reason coordinates are useful in digital graphics.", "They locate each point or pixel exactly.", "Hard"),
        q("Find the distance squared between (-1,2) and (3,5).", "25", "Easy"),
    ]
    if vectors:
        questions[4] = q("State what a vector tells you that a distance alone does not.", "A vector gives both size and direction.", "Easy")
        questions[20] = q("If a point moves by vector (4, -1) and then by vector (-2, 5), find the combined vector.", "(2, 4)", "Medium")
        questions[30] = q("Explain why vectors are useful for modelling movement in space.", "They combine direction and magnitude in one object.", "Hard")
    return build_sets(questions)


def make_trigonometry_sets(spec: ChapterSpec, rng: random.Random, advanced: bool) -> list[SetBlock]:
    questions = [
        q("State Pythagoras' theorem for a right triangle.", "a^2 + b^2 = c^2", "Easy"),
        q("Find the hypotenuse of a right triangle with legs 6 cm and 8 cm.", "10 cm", "Easy"),
        q("State what SOHCAHTOA helps you remember.", "Which trigonometric ratio uses opposite, adjacent and hypotenuse.", "Easy"),
        q("In a right triangle, if opposite = 3 and hypotenuse = 5, find sin(theta).", "3/5", "Easy"),
        q("Find the angle theta if tan(theta) = 1.", "45 deg", "Easy"),
        q("Explain how you choose between sine, cosine and tangent.", "Pick the ratio that links the known sides to the unknown side or angle.", "Medium"),
        q("A ladder is 13 m long and its foot is 5 m from a wall. Find the height reached.", "12 m", "Medium"),
        q("State one reason a sketch is helpful before using trigonometry.", "It helps identify the sides and angles clearly.", "Medium"),
        q(f"In '{spec.title}', explain one real-life situation where trigonometry supports a decision.", "Any sensible height, distance or angle context is accepted.", "Hard"),
        q("State one common trigonometry mistake and how to avoid it.", "Any realistic mistake such as choosing the wrong ratio is accepted.", "Hard"),
        q("If cos(theta) = 4/5 in a right triangle, what do 4 and 5 represent?", "Adjacent side and hypotenuse.", "Easy"),
        q("Find the missing leg of a right triangle with hypotenuse 10 cm and one leg 6 cm.", "8 cm", "Medium"),
        q("Explain the difference between an angle of elevation and an angle of depression.", "Elevation looks up; depression looks down from the horizontal.", "Medium"),
        q("Find tan(theta) if opposite = 12 and adjacent = 5.", "12/5", "Easy"),
        q("State one check you can use after finding an angle with a calculator.", "Check whether the angle size matches the diagram and side lengths.", "Medium"),
        q("A tree casts a 9 m shadow when the angle of elevation of the sun is 45 deg. Estimate the tree height.", "About 9 m", "Medium"),
        q("Explain why similar right triangles support trigonometric ratios.", "The side ratios stay constant for the same angle.", "Hard"),
        q("State whether a hypotenuse can ever be shorter than a leg in a right triangle.", "No", "Easy"),
        q("Describe one situation where Pythagoras is more suitable than trigonometry.", "When only side lengths are involved and there is a right angle.", "Medium"),
        q("Create a short trigonometry question of your own and solve it.", "Any correct self-created example is accepted.", "Hard"),
        q("Find sin(30 deg).", "1/2", "Easy"),
        q("Find cos(60 deg).", "1/2", "Easy"),
        q("Find tan(45 deg).", "1", "Easy"),
        q("Explain why calculator mode matters in trigonometry.", "Degree mode and radian mode give different outputs.", "Medium"),
        q("A ramp rises 1.2 m over a horizontal distance of 4.8 m. Find its gradient and a suitable trig ratio if you needed the angle.", "Gradient 0.25; tangent is suitable for the angle.", "Hard"),
        q("State one reason bearings problems still need clear angle labels.", "The reference direction must be explicit.", "Medium"),
        q("Find the area of a right triangle with legs 9 cm and 12 cm.", "54 cm^2", "Easy"),
        q("Explain why a 90 deg angle matters so much in basic trigonometry.", "The standard sine, cosine and tangent definitions rely on right triangles.", "Medium"),
        q("State one context where a calculator answer should be rounded carefully.", "Any measurement or design context with required precision is accepted.", "Hard"),
        q("Describe one way trigonometry connects to coordinate geometry.", "Gradients, slopes and angles can be linked through tangent.", "Hard"),
        q("Find the missing side if sin(theta)=5/13 and the hypotenuse is 13 cm.", "Opposite side = 5 cm", "Easy"),
        q("State one reason diagrams are not always to scale in exam questions.", "They illustrate the situation but are not reliable for measuring.", "Easy"),
        q("Explain why two different triangles can share the same trig ratio for the same angle.", "Similar triangles preserve the side ratios.", "Medium"),
        q("Find one angle in an isosceles right triangle.", "45 deg", "Easy"),
        q("State one reason trigonometry is useful in technology or surveying.", "It allows indirect measurement of distances or heights.", "Medium"),
        q("Write one careful-check step after finding a missing side with trigonometry.", "Check the answer is shorter than the hypotenuse when appropriate and matches the diagram.", "Medium"),
        q("Explain one difference between exact trig values and calculator approximations.", "Exact values are symbolic; approximations are rounded decimals.", "Hard"),
        q("Find the hypotenuse if cos(theta)=8/17 and the adjacent side is 8 cm.", "17 cm", "Medium"),
        q("State whether tangent uses the hypotenuse directly.", "No", "Easy"),
        q("Describe one way to communicate a full trigonometry solution clearly.", "Show the diagram labels, chosen ratio, substitution and final statement with units.", "Hard"),
    ]
    if advanced:
        questions[4] = q("Solve sin(theta) = 1/2 for 0 deg <= theta <= 180 deg.", "30 deg and 150 deg", "Medium")
        questions[25] = q("State one reason trig equations can have more than one solution in an interval.", "Trigonometric functions repeat and can take the same value at different angles.", "Hard")
        questions[37] = q("Explain one situation where the sine rule or cosine rule is more suitable than right-triangle trig.", "Use it for non-right triangles.", "Hard")
    return build_sets(questions)


def make_circle_sets(spec: ChapterSpec, rng: random.Random, proof: bool) -> list[SetBlock]:
    questions = [
        q("State what a tangent is.", "A line that touches a circle at exactly one point.", "Easy"),
        q("State one theorem about a radius and a tangent.", "A radius is perpendicular to a tangent at the point of contact.", "Easy"),
        q("If an angle at the centre is 100 deg, what is the angle at the circumference standing on the same arc?", "50 deg", "Easy"),
        q("State one property of a cyclic quadrilateral.", "Opposite angles sum to 180 deg.", "Medium"),
        q("Explain the difference between a chord and a secant.", "A chord is a segment with endpoints on the circle; a secant is a full line cutting the circle twice.", "Medium"),
        q("State one theorem involving angles in the same segment.", "Angles in the same segment are equal.", "Medium"),
        q("Find the circumference of a circle of radius 7 cm using pi = 22/7.", "44 cm", "Medium"),
        q("Explain why proofs in circle geometry need named theorems, not just measured angles.", "Measurements can mislead; named theorems justify the relationships exactly.", "Hard"),
        q(f"In '{spec.title}', describe one reason formal circle reasoning has value beyond one diagram.", "Any strong explanation about generality or proof is accepted.", "Hard"),
        q("State one common error when using circle theorems.", "Applying the wrong theorem to the wrong arc or angle.", "Hard"),
        q("Define an arc.", "A curved part of a circle's circumference.", "Easy"),
        q("Define a chord.", "A line segment joining two points on a circle.", "Easy"),
        q("What is the diameter if the radius is 9 cm?", "18 cm", "Easy"),
        q("Explain why all radii of the same circle are equal.", "They all measure the same distance from the centre to the circumference.", "Easy"),
        q("State one reason a tangent can help form angle proofs.", "It creates a right angle with the radius and links to alternate segment results.", "Medium"),
        q("If opposite angles in a quadrilateral are 92 deg and x, and the quadrilateral is cyclic, find x.", "88 deg", "Medium"),
        q("Explain what it means for two circles to be concentric.", "They share the same centre.", "Easy"),
        q("State one useful diagram habit before starting a circle-theorem problem.", "Mark equal angles, radii or tangent points clearly.", "Medium"),
        q("Create one circle-geometry question of your own and solve it.", "Any correct self-created example is accepted.", "Hard"),
        q("Explain one reason circle theorems often combine with triangle angle facts.", "Many circle diagrams contain inscribed triangles.", "Hard"),
        q("Find the area of a circle of radius 7 cm using pi = 22/7.", "154 cm^2", "Medium"),
        q("State whether a diameter is also a chord.", "Yes", "Easy"),
        q("Explain why a line from the centre to the midpoint of a chord is perpendicular to the chord.", "This is a standard circle property.", "Hard"),
        q("State one theorem about opposite angles in a cyclic quadrilateral.", "They add to 180 deg.", "Easy"),
        q("Describe one real-life design where circles, arcs or tangents matter.", "Any sensible example is accepted.", "Medium"),
        q("If a tangent meets a radius, what angle is formed?", "90 deg", "Easy"),
        q("Explain the idea of the alternate segment theorem in words.", "The angle between a tangent and a chord equals the angle in the opposite arc.", "Hard"),
        q("State one reason a diagram alone cannot be treated as proof in circle geometry.", "The picture may not be exact enough to justify a theorem.", "Hard"),
        q("Find the arc length of a semicircle with radius 7 cm using pi = 22/7.", "22 cm", "Hard"),
        q("Explain one way circle geometry can connect to construction or design work.", "Any relevant application is accepted.", "Medium"),
        q("State one relationship between equal chords and their arcs.", "Equal chords subtend equal arcs in the same circle.", "Medium"),
        q("Describe one strategy for organising reasons in a proof-style circle solution.", "Write each angle result with the theorem or angle fact used.", "Medium"),
        q("What is a sector?", "A region enclosed by two radii and an arc.", "Easy"),
        q("What is a semicircle?", "Half of a circle.", "Easy"),
        q("Explain one theorem that shows a right angle can appear on a circle.", "The angle in a semicircle is 90 deg.", "Medium"),
        q("State one reason precise labelling matters especially in proof questions.", "It makes clear which points, angles and arcs are being referenced.", "Medium"),
        q("Find the length of a radius if the diameter is 26 cm.", "13 cm", "Easy"),
        q("Explain one difference between radius, chord and tangent.", "Radius joins centre to circle, chord joins two circle points, tangent touches once.", "Easy"),
        q("Write one self-check question you would use after a circle-theorem solution.", "Any practical check about angle totals or theorem choice is accepted.", "Hard"),
        q("State one way circle theorems help reduce the need for direct measurement.", "They provide exact angle relationships from known properties.", "Hard"),
    ]
    if proof:
        questions[7] = q("Explain why giving a theorem name next to each step strengthens a proof.", "It shows the result follows from accepted properties, not appearance.", "Hard")
        questions[22] = q("State how you would justify that opposite angles of a cyclic quadrilateral are supplementary.", "Reference the equal-arc angle relationship or the standard theorem explicitly.", "Hard")
    return build_sets(questions)


def make_sequence_discrete_sets(spec: ChapterSpec, rng: random.Random, mode: str) -> list[SetBlock]:
    questions = [
        q("Find the next term in 5, 8, 11, 14, ...", "17", "Easy"),
        q("Write the nth term of 4, 7, 10, 13, ...", "3n + 1", "Medium"),
        q("State whether 2, 6, 18, 54, ... is arithmetic or geometric.", "Geometric", "Easy"),
        q("Find the next term in 3, 6, 12, 24, ...", "48", "Easy"),
        q("Explain the difference between a recursive rule and an explicit rule.", "A recursive rule uses previous terms; an explicit rule gives a direct term formula.", "Medium"),
        q("Find the 10th term of 2, 5, 8, 11, ...", "29", "Medium"),
        q("State one place where the Fibonacci sequence appears or is used.", "Any sensible example such as nature, art or coding is accepted.", "Easy"),
        q(f"In '{spec.title}', explain one reason sequences are useful for modelling change over time.", "Any strong explanation about repeated growth or pattern is accepted.", "Hard"),
        q("State one common nth-term mistake and how to avoid it.", "Any realistic example is accepted.", "Hard"),
        q("Create a short sequence question of your own and solve it.", "Any correct self-created example is accepted.", "Hard"),
        q("Find the common difference of 12, 19, 26, 33, ...", "7", "Easy"),
        q("Find the common ratio of 4, 12, 36, 108, ...", "3", "Easy"),
        q("State whether 1, 1, 2, 3, 5, 8 is recursive, explicit or both in how it is commonly introduced.", "Commonly recursive, though explicit formulas also exist.", "Medium"),
        q("Explain why checking the first few terms helps when testing an nth-term rule.", "It shows whether the formula matches the actual pattern.", "Medium"),
        q("Find the sum of the first 5 terms of 2, 5, 8, 11, ...", "40", "Medium"),
        q("State one difference between linear growth and exponential growth in a sequence.", "Linear adds a constant difference; exponential multiplies by a constant factor.", "Medium"),
        q("Describe one context where a sequence model could help a school or community plan ahead.", "Any sensible context is accepted.", "Hard"),
        q("Find term 6 of the sequence given by T_n = 4n - 1.", "23", "Easy"),
        q("Explain why patterns can sometimes be misleading if only the first few terms are known.", "Different rules can match the same starting terms.", "Hard"),
        q("State one check you can use after finding a series sum.", "Estimate or add a few terms directly to verify.", "Medium"),
        q("Find the 8th term of the arithmetic sequence with first term 7 and difference 4.", "35", "Easy"),
        q("Find the 5th term of the geometric sequence with first term 3 and ratio 2.", "48", "Easy"),
        q("Explain one practical use of a geometric sequence.", "Any example involving doubling, interest or repeated scaling is accepted.", "Medium"),
        q("Write a recursive rule for 10, 13, 16, 19, ...", "Start at 10 and add 3 each time.", "Medium"),
        q("State one reason a table can help you spot an nth-term rule.", "It lets you compare term number and value systematically.", "Medium"),
        q("Find the sum of the first 10 positive integers.", "55", "Medium"),
        q("Explain why triangular numbers form a sequence and a geometric pattern.", "Each term adds a new row of dots, and the count follows a pattern.", "Hard"),
        q("State whether 2n + 3 is a linear or quadratic nth-term rule.", "Linear", "Easy"),
        q("Describe one way a growing pattern in art or architecture could be represented by a sequence.", "Any relevant example is accepted.", "Hard"),
        q("Find T_7 if T_n = n^2 + 1.", "50", "Medium"),
        q("State one reason explicit rules are useful when n is large.", "They let you jump straight to the term without listing all previous terms.", "Medium"),
        q("Explain the difference between a sequence and a series.", "A sequence is a list of terms; a series is their sum.", "Easy"),
        q("Write the first four terms of the sequence T_n = 3n + 2.", "5, 8, 11, 14", "Easy"),
        q("Describe one mistake to avoid when summing a sequence from a formula.", "Do not confuse the nth term with the sum formula.", "Hard"),
        q("Find the missing term: 6, 10, __, 18, 22.", "14", "Easy"),
        q("State one reason recursive rules are natural in coding or algorithms.", "They define each step from the previous state.", "Medium"),
        q("Write one sentence linking sequence work to the chapter title.", "Any relevant sentence is accepted.", "Hard"),
        q("Find the number of handshakes if 5 people each shake hands once with every other person.", "10", "Hard"),
        q("Explain why order matters in some counting problems but not in others.", "It distinguishes permutations from combinations.", "Hard"),
        q("State one discrete-mathematics question where drawing a tree diagram helps.", "Any arrangement or outcome-listing example is accepted.", "Medium"),
    ]
    if mode == "discrete":
        questions[0] = q("How many different 3-letter arrangements can be made from A, B and C using each once?", "6", "Easy")
        questions[5] = q("How many ways can 2 captains be chosen from 5 students if order does not matter?", "10", "Medium")
        questions[14] = q("Explain why a tree diagram is useful in counting problems.", "It organises cases so none are missed or counted twice.", "Medium")
        questions[25] = q("How many diagonals does a pentagon have?", "5", "Hard")
        questions[39] = q("State one reason discrete mathematics is different from continuous modelling.", "It deals with separate countable objects or steps, not every value in an interval.", "Hard")
    return build_sets(questions)


def make_review_sets(spec: ChapterSpec, rng: random.Random) -> list[SetBlock]:
    questions = [
        q("Simplify 3/4 + 1/8.", "7/8", "Easy"),
        q("Find 15% of 240.", "36", "Easy"),
        q("Solve 2x + 5 = 17.", "x = 6", "Easy"),
        q("Find the area of a triangle with base 10 cm and height 8 cm.", "40 cm^2", "Easy"),
        q("Find the mean of 4, 6, 8, 10, 12.", "8", "Easy"),
        q("Explain one reason to estimate before doing an exact calculation.", "It helps check whether the exact answer is sensible.", "Medium"),
        q("State one difference between a ratio and a fraction.", "A ratio compares quantities; a fraction compares a part to a whole or division result.", "Medium"),
        q("Describe one algebra check you can use after solving an equation.", "Substitute the solution back into the original equation.", "Medium"),
        q(f"In '{spec.title}', identify one topic you would revise first and explain why.", "Any thoughtful reflection is accepted.", "Hard"),
        q("Write one short multi-step question mixing number and geometry, then solve it.", "Any correct self-created example is accepted.", "Hard"),
        q("Convert 0.45 to a fraction in simplest form.", "9/20", "Easy"),
        q("Find the gradient between (1,2) and (5,10).", "2", "Medium"),
        q("State one theorem or property from geometry that you remember confidently.", "Any correct property is accepted.", "Medium"),
        q("Find the probability of rolling a number greater than 4 on a fair die.", "1/3", "Easy"),
        q("Explain why a graph can be useful even when you also have an equation.", "It shows the overall behaviour and key features visually.", "Medium"),
        q("Find the perimeter of a square of side 9 cm.", "36 cm", "Easy"),
        q("Solve x/3 = 7.", "x = 21", "Easy"),
        q("Write one question you would ask yourself when checking units.", "Any practical units-check prompt is accepted.", "Medium"),
        q("State one data display that is useful for categorical data.", "A bar chart or pie chart.", "Easy"),
        q("Explain one reason revision should include both easy and hard questions.", "It builds fluency and also tests reasoning under challenge.", "Hard"),
        q("Expand (x + 4)(x + 2).", "x^2 + 6x + 8", "Medium"),
        q("Find the distance from 0 to -9 on a number line.", "9", "Easy"),
        q("Convert 3.5 L to mL.", "3500 mL", "Easy"),
        q("State one common exam error you want to avoid in maths.", "Any realistic reflection is accepted.", "Medium"),
        q("Describe one way topics in maths connect instead of staying separate.", "Any sensible connection is accepted.", "Hard"),
        q("Find the 6th term of 5, 8, 11, 14, ...", "20", "Easy"),
        q("Solve 3x - 4 = 11.", "x = 5", "Easy"),
        q("Find the circumference of a circle of radius 7 cm using pi = 22/7.", "44 cm", "Medium"),
        q("State one reason precise notation matters in revision.", "It prevents avoidable errors and confusion.", "Medium"),
        q("Create a one-minute revision checklist for the chapter.", "Any useful checklist is accepted.", "Hard"),
        q("Find 2/3 of 45.", "30", "Easy"),
        q("State one graph feature that often matters in an assessment answer.", "Any valid feature such as scale, labels or intercepts is accepted.", "Medium"),
        q("Explain one reason mixed practice can improve retention.", "It strengthens recall and method choice.", "Hard"),
        q("Find the value of 5^2 - 3^2.", "16", "Easy"),
        q("Write one reflective sentence about your strongest maths topic so far.", "Any relevant reflection is accepted.", "Medium"),
        q("Find the missing angle if three angles around a point are 120 deg, 95 deg and x.", "145 deg", "Medium"),
        q("State one thing you would do if a final answer looks unreasonable.", "Recheck working, estimate again or inspect units/signs.", "Medium"),
        q("Find the ratio 18:24 in simplest form.", "3:4", "Easy"),
        q("Explain one habit that helps keep working organised in long problems.", "Any relevant organisational habit is accepted.", "Medium"),
        q("Write one challenge question you still want to practise next.", "Any meaningful next-step question is accepted.", "Hard"),
    ]
    return build_sets(questions)


def build_sets(questions: list[Question]) -> list[SetBlock]:
    if len(questions) != 40:
        raise ValueError(f"Expected 40 questions, got {len(questions)}")
    blocks = []
    for idx, start in enumerate(range(0, 40, 10)):
        label, subtitle = SET_INFO[idx]
        blocks.append(SetBlock(label=label, subtitle=subtitle, questions=questions[start : start + 10]))
    return blocks


def series_label(series: str) -> str:
    labels = {
        "myp1": "MYP1",
        "myp2": "MYP2",
        "myp2v2": "MYP2 V2",
        "myp3": "MYP3",
        "myp45": "MYP4-5",
        "myp45inq": "MYP4-5 Inquiry-led",
        "myp45ext": "MYP4-5 Extended",
    }
    return labels[series]


def personalize_blocks(spec: ChapterSpec, blocks: list[SetBlock]) -> list[SetBlock]:
    track = series_label(spec.series)
    personalized = [SetBlock(label=block.label, subtitle=block.subtitle, questions=list(block.questions)) for block in blocks]
    personalized[0].questions[-1] = q(
        f"Choose one key idea from '{spec.title}' in {track} Chapter {spec.chapter_no} and illustrate it with your own short worked example.",
        "Any accurate chapter-linked idea with a correct worked example is accepted.",
        "Hard",
    )
    personalized[1].questions[-1] = q(
        f"Write one self-check question you would ask after solving a core skill from '{spec.title}' in {track}, and answer that self-check.",
        "Any sensible self-check with a mathematically valid response is accepted.",
        "Hard",
    )
    personalized[2].questions[-1] = q(
        f"Create a real-life application inspired by '{spec.title}' from {track} Chapter {spec.chapter_no} and solve it clearly.",
        "Any relevant chapter-based application with correct mathematics is accepted.",
        "Hard",
    )
    personalized[3].questions[-1] = q(
        f"Write a short reflection explaining how '{spec.title}' in {track} connects to at least one earlier maths topic you have studied.",
        "Any thoughtful reflection that makes a valid mathematical connection is accepted.",
        "Hard",
    )
    return personalized


def chapter_sets(spec: ChapterSpec) -> tuple[list[str], list[SetBlock]]:
    rng = stable_rng(str(spec.path))
    topic = spec.topic
    if topic in {"number_systems_basic", "whole_numbers", "number_properties", "order_of_operations", "number_advanced", "number_forms_advanced"}:
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_number_sets(spec, rng))
    if topic == "signed_numbers":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_signed_number_sets(spec, rng))
    if topic == "fractions":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_fraction_sets(spec, rng))
    if topic == "decimals":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_decimal_sets(spec, rng))
    if topic == "percentages":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_percentage_sets(spec, rng))
    if topic in {"ratio_proportion", "ratio_rates", "rates"}:
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_ratio_rate_sets(spec, rng))
    if topic == "probability_basic":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_probability_sets(spec, rng, advanced=False))
    if topic == "probability_advanced":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_probability_sets(spec, rng, advanced=True))
    if topic == "statistics_basic":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_statistics_sets(spec, rng, mode="basic"))
    if topic == "univariate_data":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_statistics_sets(spec, rng, mode="univariate"))
    if topic == "bivariate_data":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_statistics_sets(spec, rng, mode="bivariate"))
    if topic == "statistics_advanced":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_statistics_sets(spec, rng, mode="advanced"))
    if topic in {"algebra_basic", "equations_basic"}:
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_algebra_sets(spec, rng, level="basic"))
    if topic in {"algebra_intermediate", "algebra_advanced"}:
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_algebra_sets(spec, rng, level="advanced"))
    if topic in {"linear_relationships", "linear_functions", "coordinate_linear_advanced"}:
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_linear_sets(spec, rng))
    if topic == "linear_systems":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_linear_sets(spec, rng, systems=True))
    if topic == "matrices":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_matrix_sets(spec, rng))
    if topic in {"relations_functions", "functions_advanced"}:
        mode = "relations" if topic == "relations_functions" else "advanced"
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_function_sets(spec, rng, mode=mode))
    if topic in {"inverse_exp_log", "rational_irrational_functions"}:
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_function_sets(spec, rng, mode="advanced"))
    if topic == "quadratics":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_quadratic_sets(spec, rng))
    if topic in {"geometry_constructions", "lines_angles", "polygons"}:
        mode = "polygons" if topic == "polygons" else "lines" if topic == "lines_angles" else "construction"
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_geometry_foundation_sets(spec, rng, mode=mode))
    if topic in {"transformations_basic", "transformations_intermediate"}:
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_transformation_sets(spec, rng))
    if topic in {"triangles", "similarity", "congruency"}:
        mode = "similarity" if topic == "similarity" else "congruency" if topic == "congruency" else "triangle"
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_triangle_similarity_sets(spec, rng, mode=mode))
    if topic in {"geometry_2d3d", "measurement_basic", "measurement_length_area", "solids", "volume_capacity_mass", "geometry_3d_advanced"}:
        mode_map = {
            "geometry_2d3d": "measurement",
            "measurement_basic": "measurement",
            "measurement_length_area": "length_area",
            "solids": "solids",
            "volume_capacity_mass": "volume_capacity_mass",
            "geometry_3d_advanced": "geometry_3d_advanced",
        }
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_measurement_sets(spec, rng, mode=mode_map[topic]))
    if topic in {"coordinate_geometry_basic", "coordinate_geometry_advanced"}:
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_coordinate_sets(spec, rng, vectors=False))
    if topic == "vectors_coordinate_geometry":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_coordinate_sets(spec, rng, vectors=True))
    if topic == "trigonometry":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_trigonometry_sets(spec, rng, advanced=False))
    if topic == "trig_equations_applications":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_trigonometry_sets(spec, rng, advanced=True))
    if topic == "circle_geometry":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_circle_sets(spec, rng, proof=False))
    if topic == "circle_geometry_proof":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_circle_sets(spec, rng, proof=True))
    if topic in {"sequences_growth", "sequences_series"}:
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_sequence_discrete_sets(spec, rng, mode="sequence"))
    if topic == "discrete_math":
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_sequence_discrete_sets(spec, rng, mode="discrete"))
    if topic in {"review_mixed", "year3_extension"}:
        return SUMMARY_POINTS[topic], personalize_blocks(spec, make_review_sets(spec, rng))
    raise KeyError(f"Unhandled topic: {topic}")


def html_summary_card(summary: list[str]) -> str:
    bullet_lines = "\n".join(
        f"        <li>{html_escape(point)}</li>" for point in summary
    )
    return (
        '  <div class="set-card">\n'
        '    <h3><span class="set-label">SUMMARY</span> Chapter Highlights</h3>\n'
        '    <div style="padding:2px 6px 8px 2px;">\n'
        '      <ul style="margin:0; padding-left:1.2rem; line-height:1.75;">\n'
        f"{bullet_lines}\n"
        '      </ul>\n'
        '    </div>\n'
        '  </div>\n'
    )


def html_set_card(block: SetBlock) -> str:
    lines = [
        '  <div class="set-card">',
        f'    <h3><span class="set-label">{block.label}</span> {block.subtitle}</h3>',
        '    <button class="print-set-btn" onclick="window._printSet(this)">Print Set</button>',
        '    <div class="q-list">',
    ]
    for question in block.questions:
        diff_class = {
            "Easy": "diff diff-easy",
            "Medium": "diff diff-medium",
            "Hard": "diff diff-hard",
        }[question.difficulty]
        lines.extend(
            [
                '      <div class="q-item">',
                f'        <div class="q-text">{html_escape(question.text)}</div>',
                f'        <div class="{diff_class}">{question.difficulty}</div>',
                '      </div>',
                '      <details class="ans"><summary>Show Answer</summary>',
                f'        <p><b>Answer: {html_escape(question.answer)}</b></p>',
                '      </details>',
                "",
            ]
        )
    lines.extend(['    </div>', '  </div>'])
    return "\n".join(lines)


def html_replacement(summary: list[str], blocks: list[SetBlock]) -> str:
    parts = [html_summary_card(summary)]
    for block in blocks:
        parts.append(html_set_card(block))
    return "\n".join(parts).rstrip() + "\n"


def markdown_replacement(summary: list[str], blocks: list[SetBlock]) -> str:
    lines = ["### Chapter Summary"]
    lines.extend(f"- {point}" for point in summary)
    lines.append("")
    for block in blocks:
        lines.append(f"### {block.label.replace('SET ', 'Set ')} - {block.subtitle.split(' - ', 1)[0]}")
        for idx, question in enumerate(block.questions[:5], start=1):
            lines.append(f"{idx}. {question.text}")
        lines.append("")
    lines.append("---")
    return "\n".join(lines)


def extract_html_title(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    match = re.search(r'(?s)<div class="topic-header">.*?<h2>(.*?)</h2>', text)
    if not match:
        raise ValueError(f"Could not find chapter title in {path}")
    return re.sub(r"\s+", " ", match.group(1)).strip()


def html_specs() -> list[ChapterSpec]:
    specs: list[ChapterSpec] = []
    family_files = {
        "myp1": sorted((ROOT / "curriculum/IB/maths/myp1").glob("MYP1_Ch*_Practice.html")),
        "myp2": sorted((ROOT / "curriculum/IB/maths/myp2").glob("MYP2_Ch*_Practice.html")),
        "myp2v2": sorted((ROOT / "curriculum/IB/maths/myp2").glob("MYP2V2_Ch*_Practice.html")),
        "myp3": sorted((ROOT / "curriculum/IB/maths/myp3").glob("MYP3_Ch*_Practice.html")),
        "myp45": sorted((ROOT / "curriculum/IB/maths/myp4-5").glob("MYP4-5_Ch*_Practice.html")),
        "myp45inq": sorted((ROOT / "curriculum/IB/maths/myp4-5").glob("MYP45INQ_Ch*_Practice.html")),
        "myp45ext": sorted((ROOT / "curriculum/IB/maths/myp4-5").glob("MYP45EXT_Ch*_Practice.html")),
    }
    for series, files in family_files.items():
        for path in files:
            match = re.search(r"_Ch(\d+)_", path.name)
            if not match:
                raise ValueError(f"Could not parse chapter number from {path.name}")
            chapter_no = int(match.group(1))
            topic = SERIES_TOPICS[series][chapter_no]
            specs.append(
                ChapterSpec(
                    path=path,
                    series=series,
                    chapter_no=chapter_no,
                    title=extract_html_title(path),
                    topic=topic,
                )
            )
    return specs


def rewrite_html_files() -> None:
    for spec in html_specs():
        summary, blocks = chapter_sets(spec)
        replacement = html_replacement(summary, blocks)
        text = spec.path.read_text(encoding="utf-8")
        text = ensure_scroll_css(text)
        text = ensure_scroll_shell(text)
        text = ensure_scroll_script(text)
        content_start = text.find('  <div class="set-card">')
        script_anchor = text.rfind("\n<script>\n(function(){")
        script_prefix = ""
        if script_anchor == -1:
            script_anchor = text.rfind("\n(function(){")
            script_prefix = "<script>\n"
        if content_start == -1 or script_anchor == -1:
            raise ValueError(f"Could not locate replace anchors in {spec.path}")
        pre_script = text[:script_anchor]
        footer_match = re.search(r"\n<footer>.*?</footer>\s*$", pre_script, re.S)
        footer = footer_match.group(0).lstrip("\n") if footer_match else ""
        content_end = footer_match.start() if footer_match else script_anchor
        new_text = text[:content_start] + replacement + "</div>\n"
        if footer:
            new_text += footer
        new_text += script_prefix + text[script_anchor:]
        spec.path.write_text(new_text, encoding="utf-8")


def ensure_scroll_css(text: str) -> str:
    scroll_rule = (
        "* { box-sizing: border-box; margin: 0; padding: 0; }\n"
        "html { height: 100%; overflow: hidden; }\n"
        "body { font-family: 'Segoe UI', Arial, sans-serif; background: var(--bg); color: var(--text); "
        "line-height: 1.65; height: 100%; min-height: 100%; overflow: hidden; }\n"
        ".page-scroll { position: fixed; inset: 0; overflow-x: hidden; overflow-y: auto; "
        "-webkit-overflow-scrolling: touch; touch-action: pan-y; overscroll-behavior-y: auto; background: var(--bg); }"
    )
    text, count = re.subn(
        r"\* \{ box-sizing: border-box; margin: 0; padding: 0; \}\n(?:html \{.*?\}\n)?body \{.*?\}(?:\n\.page-scroll \{.*?\})?",
        scroll_rule,
        text,
        count=1,
        flags=re.S,
    )
    text = text.replace(
        "@media print { header, nav, footer { display: none !important; } .topic-videos { display: none !important; } details.ans { display: none !important; } body { background: #fff; color: #000; font-size: 11pt; } .topic { max-width: 100%; margin: 0; padding: 0 8px; } .set-card { box-shadow: none; border: 1px solid #bbb; page-break-inside: avoid; margin-bottom: 14px; } .q-item { page-break-inside: avoid; } }",
        "@media print { .page-scroll { position: static !important; inset: auto !important; overflow: visible !important; height: auto !important; } header, nav, footer { display: none !important; } .topic-videos { display: none !important; } details.ans { display: none !important; } body { background: #fff; color: #000; font-size: 11pt; height: auto !important; overflow: visible !important; } .topic { max-width: 100%; margin: 0; padding: 0 8px; } .set-card { box-shadow: none; border: 1px solid #bbb; page-break-inside: avoid; margin-bottom: 14px; } .q-item { page-break-inside: avoid; } }",
    )
    if count == 1:
        return text
    if "touch-action: pan-y;" not in text or ".page-scroll" not in text or "position: fixed" not in text:
        raise ValueError("Could not update scroll CSS in HTML template")
    return text


def ensure_scroll_shell(text: str) -> str:
    if '<div class="page-scroll">' in text:
        return text
    body_tag = "<body>\n"
    if body_tag not in text:
        raise ValueError("Could not find <body> tag for scroll shell")
    text = text.replace(body_tag, body_tag + '<div class="page-scroll">\n', 1)
    script_anchor = text.rfind("\n<script>")
    if script_anchor == -1:
        raise ValueError("Could not find ending <script> tag for scroll shell")
    return text[:script_anchor] + "\n</div>" + text[script_anchor:]


def ensure_scroll_script(text: str) -> str:
    if "pageScroll = document.querySelector('.page-scroll')" in text:
        return text
    old = "(function(){\nfunction printSet(btn){"
    new = """(function(){
var pageScroll = document.querySelector('.page-scroll');
if (pageScroll) {
  function scrollToTarget(target) {
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  document.addEventListener('keydown', function(e){
    if (!pageScroll) return;
    var tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    var delta = 0;
    if (e.key === 'ArrowDown') delta = 90;
    else if (e.key === 'ArrowUp') delta = -90;
    else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) delta = Math.max(240, Math.round(window.innerHeight * 0.85));
    else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) delta = -Math.max(240, Math.round(window.innerHeight * 0.85));
    else if (e.key === 'Home') { e.preventDefault(); pageScroll.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    else if (e.key === 'End') { e.preventDefault(); pageScroll.scrollTo({ top: pageScroll.scrollHeight, behavior: 'smooth' }); return; }
    if (delta) {
      e.preventDefault();
      pageScroll.scrollBy({ top: delta, behavior: 'smooth' });
    }
  }, { passive: false });
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(){
      var id = this.getAttribute('href');
      var target = id ? document.querySelector(id) : null;
      if (target) {
        setTimeout(function(){ scrollToTarget(target); }, 0);
      }
    });
  });
  if (window.location.hash) {
    var initialTarget = document.querySelector(window.location.hash);
    if (initialTarget) {
      setTimeout(function(){ scrollToTarget(initialTarget); }, 60);
    }
  }
}
function printSet(btn){"""
    if old not in text:
        raise ValueError("Could not inject scroll script fallback")
    return text.replace(old, new, 1)


def parse_markdown_chapters(path: Path) -> list[tuple[int, str]]:
    text = path.read_text(encoding="utf-8")
    matches = re.findall(r"## Chapter (\d+): (.+)", text)
    return [(int(num), title.strip()) for num, title in matches]


def rewrite_markdown_file(path: Path, series: str) -> None:
    text = path.read_text(encoding="utf-8")
    chapter_iter = list(re.finditer(r"## Chapter (\d+): (.+)", text))
    if not chapter_iter:
        raise ValueError(f"No chapters found in {path}")
    pieces: list[str] = []
    cursor = 0
    for idx, match in enumerate(chapter_iter):
        start = match.start()
        end = chapter_iter[idx + 1].start() if idx + 1 < len(chapter_iter) else len(text)
        block = text[start:end]
        pieces.append(text[cursor:start])
        chapter_no = int(match.group(1))
        title = match.group(2).strip()
        topic = SERIES_TOPICS[series][chapter_no]
        spec = ChapterSpec(path=path, series=series, chapter_no=chapter_no, title=title, topic=topic)
        summary, sets = chapter_sets(spec)
        chapter_header = re.match(r"## Chapter .*", block)
        video_match = re.search(r"### Video Resources\n(?:- .*\n)+", block)
        if not chapter_header or not video_match:
            raise ValueError(f"Could not preserve video block in chapter {chapter_no} of {path}")
        new_block = (
            chapter_header.group(0)
            + "\n\n"
            + video_match.group(0)
            + "\n\n"
            + markdown_replacement(summary, sets)
            + "\n"
        )
        pieces.append(new_block)
        cursor = end
    pieces.append(text[cursor:])
    path.write_text("".join(pieces).rstrip() + "\n", encoding="utf-8")


def rewrite_markdown_files() -> None:
    rewrite_markdown_file(ROOT / "curriculum/IB/maths/myp1/MATHS_MYP1_Chapterwise_Practice.md", "myp1")
    rewrite_markdown_file(ROOT / "curriculum/IB/maths/myp2/MATHS_MYP2_Chapterwise_Practice.md", "myp2")
    rewrite_markdown_file(ROOT / "curriculum/IB/maths/myp3/MATHS_MYP3_Chapterwise_Practice.md", "myp3")
    rewrite_markdown_file(ROOT / "curriculum/IB/maths/myp4-5/MATHS_MYP4-5_Chapterwise_Practice.md", "myp45")


def verify_output() -> None:
    sample_files = html_specs()
    seen = set()
    for spec in sample_files:
        text = spec.path.read_text(encoding="utf-8")
        if "Chapter Highlights" not in text:
            raise ValueError(f"Missing summary block in {spec.path}")
        if "touch-action: pan-y;" not in text or "-webkit-overflow-scrolling: touch;" not in text or ".page-scroll { position: fixed;" not in text:
            raise ValueError(f"Missing scroll CSS hardening in {spec.path}")
        if '<div class="page-scroll">' not in text or "pageScroll = document.querySelector('.page-scroll')" not in text:
            raise ValueError(f"Missing scroll wrapper fallback in {spec.path}")
        questions = re.findall(r'<div class="q-text">(.*?)</div>', text)
        if len(questions) != 40:
            raise ValueError(f"Expected 40 questions in {spec.path}, found {len(questions)}")
        fingerprint = "\n".join(questions)
        if fingerprint in seen:
            raise ValueError(f"Duplicate question bank detected for {spec.path}")
        seen.add(fingerprint)


def main() -> None:
    rewrite_html_files()
    rewrite_markdown_files()
    verify_output()
    print("Regenerated MYP maths practice files successfully.")


if __name__ == "__main__":
    main()
