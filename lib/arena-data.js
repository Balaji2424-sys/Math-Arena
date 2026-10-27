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
            calculations: 'Let the tens digit be x and the units digit be y.\nDigit sum: x + y = 11.\nOriginal minus reversed number: (10x + y) âˆ’ (10y + x) = 27, so 9(x âˆ’ y) = 27 and x âˆ’ y = 3.\nSolving x + y = 11 and x âˆ’ y = 3 gives x = 7 and y = 4.',
            reasoning: 'The original number is 10x + y = 74. Its reverse is 47, which is 27 less. The digits sum to 11 and the tens digit exceeds the units digit.',
            assumptions: 'The number is a positive two-digit integer; reversing the digits forms the usual two-digit numeral.',
            changed: 'If the reversed number is 18 less than the original, then x âˆ’ y = 2. Together with x + y = 11 this gives x = 6.5 and y = 4.5, which cannot be digits. No two-digit integer satisfies both conditions.',
            judging: 'Accept an equivalent algebraic method. Under the changed condition, look for the team to notice that the system has no integer digit solution.'
          },
          ruleChanger: 'Change the condition so the reversed number is 18 less than the original. Teams should find the new number and explain the change.',
          organiserNotes: 'Source answer key. The rule-changer produces no whole-digit solution with a digit sum of 11; preserve that conclusion rather than forcing a new number.'
        },
        {
          id: 'triangular-steel-frame', title: 'The Triangular Steel Frame',
          card1: 'A triangular steel frame ABC has equal sides AB = AC. The bisectors of angles B and C are welded as rods, and they meet at point I inside the frame.',
          card2: 'The angle between the two rods at I, âˆ BIC, is 130Â°.',
          card3: 'A straight brace PQ passes through I, parallel to BC, with P on AB and Q on AC. Find âˆ A, âˆ B and âˆ C. Then find âˆ PIB and âˆ AQP, stating the property used at each step.',
          answerKey: {
            answer: 'âˆ A = 80Â°, âˆ B = 50Â°, âˆ C = 50Â°, and âˆ AQP = 50Â°. âˆ PIB cannot be uniquely determined from the stated information.',
            calculations: 'Since BI and CI bisect angles B and C, I is the incenter. For a triangle, âˆ BIC = 90Â° + (âˆ A Ã· 2).\n130Â° = 90Â° + (âˆ A Ã· 2), so âˆ A = 80Â°.\nAB = AC, so the base angles are equal: âˆ B = âˆ C = (180Â° âˆ’ 80Â°) Ã· 2 = 50Â°.',
            reasoning: 'Because PQ is parallel to BC and Q lies on AC, âˆ AQP = 50Â° by corresponding/alternate-angle relationships, depending on the stated ray directions in the diagram.',
            assumptions: 'AB = AC makes ABC isosceles with base BC. BI and CI are the internal angle bisectors described in the source.',
            changed: 'With âˆ BIC = 120Â°, 120Â° = 90Â° + (âˆ A Ã· 2), so âˆ A = 60Â°. The equal base angles are each 60Â°.',
            judging: 'Do not accept a unique value for âˆ PIB. The source explicitly says the direction/definition of segment PI is not sufficiently specified.'
          },
          ruleChanger: 'Change âˆ BIC to 120Â°. Teams recalculate the triangle angles and explain the effect on the base angles.',
          organiserNotes: 'Source answer key limitation: âˆ PIB cannot be uniquely determined because the direction/definition of segment PI is not sufficiently specified. The source gives the âˆ AQP angle property with ray-direction dependence; a diagram/ray convention would be needed for a more specific justification.'
        },
        {
          id: 'doubling-water-tank-volume', title: 'Doubling the Water Tank Volume',
          card1: 'A school has a cuboidal water tank with length 8 m, breadth 5 m, and height 3 m. Calculate its volume.',
          card2: "The school wants a second tank with twice the volume of the original tank. The new tank's length must remain 8 m, and its breadth must remain 5 m.",
          card3: 'The school has enough space to increase the height by no more than 5 m. Is the new tank possible?',
          answerKey: {
            answer: 'Yes. The new height is 6 m, an increase of 3 m.',
            calculations: 'Original volume = 8 Ã— 5 Ã— 3 = 120 mÂ³.\nTwice the volume = 240 mÂ³.\nRequired height = 240 Ã· (8 Ã— 5) = 6 m.\nHeight increase = 6 âˆ’ 3 = 3 m, which is within the 5 m limit.',
            reasoning: 'With length and breadth fixed, volume is proportional to height. A 3 m increase is within the allowed 5 m increase.',
            assumptions: 'The tank is cuboidal and the dimensions are internal dimensions suitable for the stated volume calculation.',
            changed: 'If the maximum permitted increase is 2 m, the new height can be at most 5 m and the volume is 8 Ã— 5 Ã— 5 = 200 mÂ³. Doubling to 240 mÂ³ is not possible.',
            judging: 'Require comparison of the required 3 m height increase with the stated maximum, rather than only comparing volumes.'
          },
          ruleChanger: 'Reduce the maximum permitted height increase from 5 m to 2 m. Teams decide whether doubling the volume is still possible.',
          organiserNotes: 'Source answer key. Keep all length units in metres and volume units in cubic metres.'
        },
        {
          id: 'school-annual-day-stage', title: 'School Annual Day Stage',
          card1: 'A school is building a rectangular stage for its Annual Day programme. LED lights cost â‚¹60 per metre, and the budget is â‚¹3,720. Determine what this tells you about the stage\'s length and breadth.',
          card2: 'The entire budget is spent on the LED border. A support from one corner to the opposite corner must be exactly 25 m long.',
          card3: 'The stage must have an area of at least 150 mÂ². The length and breadth must be whole numbers of metres. Length means the longer side; a square stage is allowed.',
          answerKey: {
            answer: 'Yes. Length = 24 m, breadth = 7 m, and area = 168 mÂ². All conditions are satisfied.',
            calculations: 'Perimeter = â‚¹3,720 Ã· â‚¹60 per metre = 62 m, so 2(l + b) = 62 and l + b = 31.\nBy Pythagorasâ€™ theorem, lÂ² + bÂ² = 25Â² = 625.\n(l + b)Â² = lÂ² + bÂ² + 2lb, so 31Â² = 625 + 2lb; hence lb = 168.\nThe dimensions are roots of tÂ² âˆ’ 31t + 168 = 0 = (t âˆ’ 24)(t âˆ’ 7).\nCheck: perimeter = 62 m; diagonal = âˆš(24Â² + 7Â²) = 25 m; area = 24 Ã— 7 = 168 mÂ².',
            reasoning: 'The perimeter and diagonal determine the sum and sum of squares of the side lengths. These give product 168 and dimensions 24 m and 7 m. The area is at least 150 mÂ².',
            assumptions: 'The LED border follows the entire rectangular perimeter, at â‚¹60 per metre. The support is the rectangleâ€™s diagonal. Whole-number dimensions are in metres.',
            changed: 'If the minimum area is 170 mÂ², the 24 m by 7 m stage has area 168 mÂ² and no longer qualifies. The perimeter and diagonal still force those same dimensions, so no alternative dimensions meet all the conditions.',
            judging: 'Check the cost-to-perimeter conversion and verify both the Pythagorean diagonal and the area condition.'
          },
          ruleChanger: 'Raise the minimum area to 170 mÂ². Teams explain why the original dimensions no longer qualify.',
          organiserNotes: 'The source includes anchor-script prompts: Card 1 ask for unknowns and perimeter equation; Card 2 ask which theorem links length, breadth, and diagonal; Card 3 ask teams to check all conditions. Sourceâ€™s recommended main live finale is this scenario.'
        },
        {
          id: 'rectangular-water-tank', title: 'Rectangular Water Tank: Capacity and Surface Area',
          card1: 'A school wants to install a rectangular water tank. Its capacity depends on its length, breadth and height.',
          card2: 'The tank has length 4 m, breadth 3 m and height 2 m. Find its water capacity and total outside surface area.',
          card3: 'The tank must hold at least 30,000 litres. Length and breadth remain unchanged, and height must be a whole number of metres. Find the minimum height and total outside surface area of the new closed tank.',
          answerKey: {
            answer: 'Minimum height = 3 m; capacity = 36,000 litres; total outside surface area = 66 mÂ².',
            calculations: 'Initial volume = 4 Ã— 3 Ã— 2 = 24 mÂ³ = 24,000 litres.\nRequired volume is at least 30 mÂ³. Since 4 Ã— 3 Ã— h â‰¥ 30, 12h â‰¥ 30, so h â‰¥ 2.5 m.\nThe minimum whole-number height is 3 m.\nNew capacity = 4 Ã— 3 Ã— 3 = 36 mÂ³ = 36,000 litres.\nClosed-tank total surface area = 2(lb + bh + lh) = 2(12 + 9 + 12) = 66 mÂ².',
            reasoning: 'Since 1 mÂ³ = 1,000 litres, 30,000 litres is 30 mÂ³. The smallest whole-number h with 12h â‰¥ 30 is 3.',
            assumptions: 'The new tank is closed, as specified in Card 3; total outside area includes all six faces. Use 1 mÂ³ = 1,000 litres.',
            changed: 'At least 50,000 litres requires 12h â‰¥ 50, so h â‰¥ 50/12. The minimum whole-number height is 5 m. Capacity = 60 mÂ³ = 60,000 litres. Total outside surface area = 2(12 + 3Ã—5 + 4Ã—5) = 94 mÂ².',
            judging: 'Distinguish the initial 2 m high tank from the new tank and use the closed-tank total surface-area formula.'
          },
          ruleChanger: 'Raise the capacity requirement to at least 50,000 litres. Teams recalculate the minimum whole-number height and surface area.',
          organiserNotes: 'The source asks for total outside surface area of the initial tank in Card 2 without explicitly saying it is closed until Card 3 (â€œnew closed tankâ€). The answer keyâ€™s standard total surface-area calculation treats the tank as a closed cuboid; clarify this assumption if needed.'
        },
        {
          id: 'factorisation-exhibition-display', title: 'Factorisation: School Exhibition Display',
          card1: 'A rectangular display board has area xÂ² + 7x + 12 mÂ², where x is a positive whole number. Its length and breadth are each of the form (x + a) metres, where a is a positive whole number. Use factorisation to find possible dimensions.',
          card2: 'The school has exactly 26 m of decorative ribbon and uses all of it once around the board\'s boundary. Determine x and the dimensions.',
          card3: 'The board must hold at least 40 square posters, each measuring 1 m Ã— 1 m. Posters must be arranged in rows and columns without cutting, overlapping or extending beyond the board. Determine whether the board satisfies all conditions, its dimensions, and the maximum poster count.',
          answerKey: {
            answer: 'Yes. Dimensions = 7 m Ã— 6 m; maximum = 42 posters.',
            calculations: 'Factorise xÂ² + 7x + 12 = (x + 3)(x + 4), so the dimensions are x + 3 and x + 4.\nPerimeter: 2[(x + 3) + (x + 4)] = 26, so 4x + 14 = 26 and x = 3.\nDimensions are 6 m Ã— 7 m; area = 42 mÂ².\nEach poster occupies 1 mÂ², so the board fits 42 posters in 6 rows and 7 columns.',
            reasoning: 'The polynomial factors into the side lengths. The perimeter condition determines x = 3; the resulting integer side lengths fit exactly 42 unit-square posters, at least 40.',
            assumptions: 'Posters are 1 m Ã— 1 m and the board dimensions are integer metres, so a grid of rows and columns fits without cutting.',
            changed: 'The board holds at most 42 posters. Requiring at least 45 without changing the board dimensions cannot be met.',
            judging: 'Accept either orientation of the 6 m and 7 m sides. Connect the poster count to the board area and the 1 mÂ² poster area.'
          },
          ruleChanger: 'Require at least 45 posters without changing the board dimensions. Teams explain whether the board qualifies.',
          organiserNotes: 'The wording says both side lengths are each of the form (x + a); factorisation gives the two positive offsets 3 and 4. Source answer key resolves the dimensions as x + 3 and x + 4.'
        }
      ]
    },
    class10: { label: 'CLASS 10', enabled: false, scenarios: [] },
    class11: { label: 'CLASS 11', enabled: false, scenarios: [] },
    class12: { label: 'CLASS 12', enabled: false, scenarios: [] }
  }
};
module.exports = ARENA_CONFIG;

