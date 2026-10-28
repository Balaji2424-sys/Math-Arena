const ARENA_CONFIG = {
  allowRepeatScenarios: false,
  randomSelectionMode: 'unused', // 'unused' or 'all'
  classes: {
    class9: {
      label: 'CLASS 9', enabled: true, scenarios: [
        {
          id: 'secret-number', title: 'The Secret Number',
          card1: 'A teacher thinks of a positive two-digit number. The number is kept secret, and students must use algebraic reasoning to discover it.',
          card2: 'The sum of the digits is 11. When the digits are reversed, the new number is 27 less than the original number.',
          card3: 'The number is a two-digit positive integer, and its tens digit is greater than its units digit. Find the original number.',
          options: 'Options: A) 74     B) 83     C) 92     D) 65',
          answerKey: {
            answer: 'A) 74.',
            calculations: 'Let the tens digit be x and the units digit be y.\nDigit sum: x + y = 11.\nOriginal minus reversed number: (10x + y) − (10y + x) = 27, so 9(x − y) = 27 and x − y = 3.\nSolving x + y = 11 and x − y = 3 gives x = 7 and y = 4.',
            reasoning: 'The original number is 10x + y = 74. Its reverse is 47, which is 27 less. The digits sum to 11 and the tens digit exceeds the units digit.',
            assumptions: 'The number is a positive two-digit integer; reversing the digits forms the usual two-digit numeral.',
            changed: 'If the reversed number is 18 less than the original, then x − y = 2. Together with x + y = 11 this gives x = 6.5 and y = 4.5, which cannot be digits. No two-digit integer satisfies both conditions.',
            judging: 'Accept an equivalent algebraic method. Under the changed condition, look for the team to notice that the system has no integer digit solution.'
          },
          ruleChanger: 'Change the condition so the reversed number is 18 less than the original. Teams should find the new number and explain the change.',
          organiserNotes: 'Source answer key. The rule-changer produces no whole-digit solution with a digit sum of 11; preserve that conclusion rather than forcing a new number.'
        },
        {
          id: 'triangular-steel-frame', title: 'The Triangular Steel Frame',
          card1: 'A triangular steel frame ABC has equal sides AB = AC. The bisectors of angles B and C are welded as rods, and they meet at point I inside the frame.',
          card2: 'The angle between the two rods at I, ∠BIC, is 130°.',
          card3: 'A straight brace PQ passes through I, parallel to BC, with P on AB and Q on AC. Find ∠A, ∠B and ∠C. Then find ∠PIB and ∠AQP, stating the property used at each step.',
          answerKey: {
            answer: '∠A = 80°, ∠B = 50°, ∠C = 50°, and ∠AQP = 50°. ∠PIB cannot be uniquely determined from the stated information.',
            calculations: 'Since BI and CI bisect angles B and C, I is the incenter. For a triangle, ∠BIC = 90° + (∠A ÷ 2).\n130° = 90° + (∠A ÷ 2), so ∠A = 80°.\nAB = AC, so the base angles are equal: ∠B = ∠C = (180° − 80°) ÷ 2 = 50°.',
            reasoning: 'Because PQ is parallel to BC and Q lies on AC, ∠AQP = 50° by corresponding/alternate-angle relationships, depending on the stated ray directions in the diagram.',
            assumptions: 'AB = AC makes ABC isosceles with base BC. BI and CI are the internal angle bisectors described in the source.',
            changed: 'With ∠BIC = 120°, 120° = 90° + (∠A ÷ 2), so ∠A = 60°. The equal base angles are each 60°.',
            judging: 'Do not accept a unique value for ∠PIB. The source explicitly says the direction/definition of segment PI is not sufficiently specified.'
          },
          ruleChanger: 'Change ∠BIC to 120°. Teams recalculate the triangle angles and explain the effect on the base angles.',
          organiserNotes: 'Source answer key limitation: ∠PIB cannot be uniquely determined because the direction/definition of segment PI is not sufficiently specified. The source gives the ∠AQP angle property with ray-direction dependence; a diagram/ray convention would be needed for a more specific justification.'
        },
        {
          id: 'doubling-water-tank-volume', title: 'Doubling the Water Tank Volume',
          card1: 'A school has a cuboidal water tank with length 8 m, breadth 5 m, and height 3 m. Calculate its volume.',
          card2: "The school wants a second tank with twice the volume of the original tank. The new tank's length must remain 8 m, and its breadth must remain 5 m.",
          card3: 'The school has enough space to increase the height by no more than 5 m. Is the new tank possible?',
          answerKey: {
            answer: 'Yes. The new height is 6 m, an increase of 3 m.',
            calculations: 'Original volume = 8 × 5 × 3 = 120 m³.\nTwice the volume = 240 m³.\nRequired height = 240 ÷ (8 × 5) = 6 m.\nHeight increase = 6 − 3 = 3 m, which is within the 5 m limit.',
            reasoning: 'With length and breadth fixed, volume is proportional to height. A 3 m increase is within the allowed 5 m increase.',
            assumptions: 'The tank is cuboidal and the dimensions are internal dimensions suitable for the stated volume calculation.',
            changed: 'If the maximum permitted increase is 2 m, the new height can be at most 5 m and the volume is 8 × 5 × 5 = 200 m³. Doubling to 240 m³ is not possible.',
            judging: 'Require comparison of the required 3 m height increase with the stated maximum, rather than only comparing volumes.'
          },
          ruleChanger: 'Reduce the maximum permitted height increase from 5 m to 2 m. Teams decide whether doubling the volume is still possible.',
          organiserNotes: 'Source answer key. Keep all length units in metres and volume units in cubic metres.'
        },
        {
          id: 'school-annual-day-stage', title: 'School Annual Day Stage',
          card1: 'A school is building a rectangular stage for its Annual Day programme. LED lights cost ₹60 per metre, and the budget is ₹3,720. Determine what this tells you about the stage\'s length and breadth.',
          card2: 'The entire budget is spent on the LED border. A support from one corner to the opposite corner must be exactly 25 m long.',
          card3: 'The stage must have an area of at least 150 m². The length and breadth must be whole numbers of metres. Length means the longer side; a square stage is allowed.',
          answerKey: {
            answer: 'Yes. Length = 24 m, breadth = 7 m, and area = 168 m². All conditions are satisfied.',
            calculations: 'Perimeter = ₹3,720 ÷ ₹60 per metre = 62 m, so 2(l + b) = 62 and l + b = 31.\nBy Pythagoras’ theorem, l² + b² = 25² = 625.\n(l + b)² = l² + b² + 2lb, so 31² = 625 + 2lb; hence lb = 168.\nThe dimensions are roots of t² − 31t + 168 = 0 = (t − 24)(t − 7).\nCheck: perimeter = 62 m; diagonal = √(24² + 7²) = 25 m; area = 24 × 7 = 168 m².',
            reasoning: 'The perimeter and diagonal determine the sum and sum of squares of the side lengths. These give product 168 and dimensions 24 m and 7 m. The area is at least 150 m².',
            assumptions: 'The LED border follows the entire rectangular perimeter, at ₹60 per metre. The support is the rectangle’s diagonal. Whole-number dimensions are in metres.',
            changed: 'If the minimum area is 170 m², the 24 m by 7 m stage has area 168 m² and no longer qualifies. The perimeter and diagonal still force those same dimensions, so no alternative dimensions meet all the conditions.',
            judging: 'Check the cost-to-perimeter conversion and verify both the Pythagorean diagonal and the area condition.'
          },
          ruleChanger: 'Raise the minimum area to 170 m². Teams explain why the original dimensions no longer qualify.',
          organiserNotes: 'The source includes anchor-script prompts: Card 1 ask for unknowns and perimeter equation; Card 2 ask which theorem links length, breadth, and diagonal; Card 3 ask teams to check all conditions. Source’s recommended main live finale is this scenario.'
        },
        {
          id: 'rectangular-water-tank', title: 'Rectangular Water Tank: Capacity and Surface Area',
          card1: 'A school wants to install a rectangular water tank. Its capacity depends on its length, breadth and height.',
          card2: 'The tank has length 4 m, breadth 3 m and height 2 m. Find its water capacity and total outside surface area.',
          card3: 'The tank must hold at least 30,000 litres. Length and breadth remain unchanged, and height must be a whole number of metres. Find the minimum height and total outside surface area of the new closed tank.',
          answerKey: {
            answer: 'Minimum height = 3 m; capacity = 36,000 litres; total outside surface area = 66 m².',
            calculations: 'Initial volume = 4 × 3 × 2 = 24 m³ = 24,000 litres.\nRequired volume is at least 30 m³. Since 4 × 3 × h ≥ 30, 12h ≥ 30, so h ≥ 2.5 m.\nThe minimum whole-number height is 3 m.\nNew capacity = 4 × 3 × 3 = 36 m³ = 36,000 litres.\nClosed-tank total surface area = 2(lb + bh + lh) = 2(12 + 9 + 12) = 66 m².',
            reasoning: 'Since 1 m³ = 1,000 litres, 30,000 litres is 30 m³. The smallest whole-number h with 12h ≥ 30 is 3.',
            assumptions: 'The new tank is closed, as specified in Card 3; total outside area includes all six faces. Use 1 m³ = 1,000 litres.',
            changed: 'At least 50,000 litres requires 12h ≥ 50, so h ≥ 50/12. The minimum whole-number height is 5 m. Capacity = 60 m³ = 60,000 litres. Total outside surface area = 2(12 + 3×5 + 4×5) = 94 m².',
            judging: 'Distinguish the initial 2 m high tank from the new tank and use the closed-tank total surface-area formula.'
          },
          ruleChanger: 'Raise the capacity requirement to at least 50,000 litres. Teams recalculate the minimum whole-number height and surface area.',
          organiserNotes: 'The source asks for total outside surface area of the initial tank in Card 2 without explicitly saying it is closed until Card 3 (“new closed tank”). The answer key’s standard total surface-area calculation treats the tank as a closed cuboid; clarify this assumption if needed.'
        },
        {
          id: 'factorisation-exhibition-display', title: 'Factorisation: School Exhibition Display',
          card1: 'A rectangular display board has area x² + 7x + 12 m², where x is a positive whole number. Its length and breadth are each of the form (x + a) metres, where a is a positive whole number. Use factorisation to find possible dimensions.',
          card2: 'The school has exactly 26 m of decorative ribbon and uses all of it once around the board\'s boundary. Determine x and the dimensions.',
          card3: 'The board must hold at least 40 square posters, each measuring 1 m × 1 m. Posters must be arranged in rows and columns without cutting, overlapping or extending beyond the board. Determine whether the board satisfies all conditions, its dimensions, and the maximum poster count.',
          answerKey: {
            answer: 'Yes. Dimensions = 7 m × 6 m; maximum = 42 posters.',
            calculations: 'Factorise x² + 7x + 12 = (x + 3)(x + 4), so the dimensions are x + 3 and x + 4.\nPerimeter: 2[(x + 3) + (x + 4)] = 26, so 4x + 14 = 26 and x = 3.\nDimensions are 6 m × 7 m; area = 42 m².\nEach poster occupies 1 m², so the board fits 42 posters in 6 rows and 7 columns.',
            reasoning: 'The polynomial factors into the side lengths. The perimeter condition determines x = 3; the resulting integer side lengths fit exactly 42 unit-square posters, at least 40.',
            assumptions: 'Posters are 1 m × 1 m and the board dimensions are integer metres, so a grid of rows and columns fits without cutting.',
            changed: 'The board holds at most 42 posters. Requiring at least 45 without changing the board dimensions cannot be met.',
            judging: 'Accept either orientation of the 6 m and 7 m sides. Connect the poster count to the board area and the 1 m² poster area.'
          },
          ruleChanger: 'Require at least 45 posters without changing the board dimensions. Teams explain whether the board qualifies.',
          organiserNotes: 'The wording says both side lengths are each of the form (x + a); factorisation gives the two positive offsets 3 and 4. Source answer key resolves the dimensions as x + 3 and x + 4.'
        }
      ]
    },
    class10: {
      label: 'CLASS 10', enabled: true, scenarios: [
        {
          id: "class10-set-01", title: "The Smart School Garden",
          cardLabels: ["Mystery Brief", "Additional Evidence", "Final Challenge"],
          card1: "A school plans to arrange plants in rows for its mathematics garden. The number of plants in each row follows an arithmetic progression (AP). The first row contains 8 plants, and each successive row contains the same number of additional plants.",
          card2: "There are 12 rows in total, and the last row contains 41 plants.",
          card3: "1. Determine the common difference.\n2. Calculate the total number of plants required.\n3. If the garden can accommodate only 280 plants, is the original plan feasible? If not, how many plants must be removed while keeping the first row and common difference unchanged?"
        },
        {
          id: "class10-set-02", title: "The Exhibition Display Board",
          cardLabels: ["Mystery Brief", "Additional Evidence", "Final Challenge"],
          card1: "A rectangular display board is being designed for a school exhibition. Its area is represented by the quadratic expression \\(x^2+11x+24\\) square metres, where \\(x\\) is a positive integer.",
          card2: "The board's length and breadth correspond to the two linear factors of the area expression. The perimeter of the board is 34 metres.",
          card3: "1. Factorise the area expression and determine the dimensions.\n2. Find the value of \\(x\\).\n3. The school needs at least 70 square metres of display area. Does the board meet the requirement? If not, find the minimum additional area required."
        },
        {
          id: "class10-set-03", title: "The Campus Coordinate Map",
          cardLabels: ["Mystery Brief", "Additional Evidence", "Final Challenge"],
          card1: "A school maps three facilities on a coordinate grid: the library \\(A(2,3)\\), the laboratory \\(B(8,3)\\), and the auditorium \\(C(5,7)\\). A straight walking route is planned between these locations.",
          card2: "Each unit on the map represents 100 metres. A new help desk must be placed at the midpoint of the route connecting the library and the laboratory.",
          card3: "1. Find the midpoint coordinates.\n2. Calculate the three side lengths of triangle \\(ABC\\) in map units.\n3. Determine whether the triangle is isosceles and calculate its perimeter in metres.\n4. Explain why the midpoint is equally distant from the library and laboratory."
        },
        {
          id: "class10-set-04", title: "The Inaccessible Tower",
          cardLabels: ["Mystery Brief", "Additional Evidence", "Final Challenge"],
          card1: "Students must estimate the height of a school tower without climbing it. They measure the angle of elevation from a point on level ground.",
          card2: "At point \\(P\\), the angle of elevation to the top is \\(30^\\circ\\). The students then move 20 metres directly towards the tower to point \\(Q\\), where the angle becomes \\(60^\\circ\\).",
          card3: "Assuming the ground is level and the measurements are accurate:\n1. Find the distance from \\(Q\\) to the tower.\n2. Calculate the tower's height.\n3. Find the original distance from \\(P\\) to the tower.\n4. Explain which trigonometric ratios support your result."
        },
        {
          id: "class10-set-05", title: "The Shadow of the Flagpole",
          cardLabels: ["Mystery Brief", "Additional Evidence", "Final Challenge"],
          card1: "During a school sports event, students use shadows to estimate the height of a flagpole. A vertical measuring rod is placed on the same level ground as the flagpole.",
          card2: "The rod is 1.5 metres tall and casts a shadow 2 metres long. At the same time, the flagpole casts a shadow 12 metres long.",
          card3: "1. Calculate the height of the flagpole using similar triangles.\n2. State the conditions that make the triangles similar.\n3. Later, the shadow of the flagpole decreases to 8 metres while the rod's shadow becomes \\(4/3\\) metres. Check whether the estimated flagpole height remains consistent."
        },
        {
          id: "class10-set-06", title: "The Circular Stage Design",
          cardLabels: ["Mystery Brief", "Additional Evidence", "Final Challenge"],
          card1: "A circular stage is being built for the school's cultural programme. A straight support cable connects two points on the circumference, and the stage's centre is marked \\(O\\).",
          card2: "The cable is 16 metres long. The perpendicular distance from the centre \\(O\\) to the cable is 6 metres.",
          card3: "1. Find the radius of the stage.\n2. Calculate its circumference and area in terms of \\(\\pi\\).\n3. The school wants to place a safety barrier around the entire circumference. If barrier material costs \u20b9250 per metre, calculate the total cost in terms of \\(\\pi\\).\n4. Explain why the perpendicular from the centre to a chord bisects the chord."
        },
        {
          id: "class10-set-07", title: "The Water Tank Upgrade",
          cardLabels: ["Mystery Brief", "Additional Evidence", "Final Challenge"],
          card1: "A school uses a closed cylindrical tank to store water. The tank must be redesigned to increase its capacity without changing its radius.",
          card2: "The existing tank has radius 3 metres and height 4 metres. The new tank must hold 1.5 times the original volume, while its radius remains 3 metres.",
          card3: "1. Find the original capacity in cubic metres.\n2. Determine the height needed for the new tank.\n3. Calculate the total surface area of the new closed tank.\n4. If the new tank's height is limited to 7 metres, determine whether the design is feasible and justify your answer."
        },
        {
          id: "class10-set-08", title: "The Inter-School Quiz Results",
          cardLabels: ["Mystery Brief", "Additional Evidence", "Final Challenge"],
          card1: "A school compares the marks of 10 students who participated in a mathematics selection test. The teacher wants to use statistics rather than only the highest mark to assess the group's performance.",
          card2: "The marks are:\n\n12, 15, 18, 18, 20, 22, 22, 22, 25, 26",
          card3: "1. Calculate the mean, median and mode.\n2. Find the range.\n3. A new student scores 40 and is added to the group. Explain which measure\u2014mean, median or mode\u2014is most affected and calculate the new mean.\n4. Defend which measure you would use to describe the typical student's performance."
        },
        {
          id: "class10-set-09", title: "The Probability Challenge",
          cardLabels: ["Mystery Brief", "Additional Evidence", "Final Challenge"],
          card1: "At a mathematics fair, a game uses one fair six-sided die. A participant wins a point by rolling a number that satisfies a secret condition.",
          card2: "A roll is successful if the number is either prime or greater than 4.",
          card3: "1. List the outcomes that produce a win.\n2. Calculate the probability of winning and the probability of losing.\n3. The organiser changes the rule so that a participant wins only if the number is both prime and greater than 4. Calculate the new probability.\n4. Explain the difference between \u201cor\u201d and \u201cand\u201d in this problem."
        },
        {
          id: "class10-set-10", title: "The School's Emergency Supply Plan",
          cardLabels: ["Mystery Brief", "Additional Evidence", "Final Challenge"],
          card1: "A school committee must arrange emergency supply kits into identical groups. The total number of kits is unknown, but it is known to be greater than 100 and less than 200.",
          card2: "When the kits are grouped in batches of 6, 8 or 10, there are always 2 kits left over.",
          card3: "1. Find the smallest possible number of kits.\n2. Explain how the least common multiple helps solve the problem.\n3. The committee later receives 18 additional kits. Can the new total be divided exactly into groups of 6, 8 and 10? Justify your answer.\n4. If not, find the smallest additional number of kits needed after the delivery to make the total divisible by all three batch sizes."
        }
      ]
    },
    class11: { label: 'CLASS 11', enabled: false, scenarios: [] },
    class12: { label: 'CLASS 12', enabled: false, scenarios: [] }
  }
};
module.exports = ARENA_CONFIG;

