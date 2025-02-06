import { FC } from "react";

const WalkingManSVG: FC<{ width?: string,fill?: string }> = ({ width,fill }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "1280.000000pt"}
      height={width ? width : "1280.000000pt"}
      viewBox="0 0 1280.000000 1280.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
        fill={fill?fill:"#000000"}
        stroke="none"
      >
        <path
          d="M5965 12790 c-282 -24 -506 -146 -684 -369 -167 -210 -241 -419 -241
-680 0 -239 70 -434 224 -628 137 -173 345 -304 566 -359 67 -16 374 -19 434
-3 176 45 264 86 393 182 178 131 318 335 375 544 30 111 37 377 14 494 -45
224 -138 392 -308 555 -163 157 -271 212 -498 255 -81 15 -172 18 -275 9z"
        />
        <path
          d="M5800 10491 c-144 -26 -288 -92 -431 -197 -65 -48 -293 -273 -881
-872 -436 -444 -861 -874 -943 -957 -199 -198 -223 -241 -254 -457 -10 -73
-26 -203 -36 -288 -9 -85 -22 -204 -30 -265 -8 -60 -19 -164 -25 -230 -6 -66
-13 -131 -16 -145 -6 -34 -9 -62 -28 -225 -9 -77 -23 -189 -31 -250 -8 -60
-19 -164 -26 -230 -6 -66 -20 -181 -30 -255 -10 -74 -19 -158 -19 -185 0 -58
27 -161 60 -225 28 -55 135 -162 189 -190 148 -75 346 -63 466 28 57 43 137
138 160 191 9 20 20 45 25 56 26 59 38 139 56 388 4 48 11 90 16 93 4 3 8 26
8 52 0 51 11 169 40 417 10 88 24 219 30 290 6 72 18 180 25 240 8 61 17 139
20 175 3 36 11 106 17 157 l10 92 319 322 c176 177 321 320 323 318 6 -5 -25
-284 -38 -349 -2 -14 -10 -79 -16 -145 -6 -66 -20 -181 -30 -255 -10 -74 -23
-189 -30 -255 -6 -66 -18 -165 -25 -220 -8 -55 -16 -127 -20 -160 -3 -33 -12
-107 -20 -165 -8 -58 -21 -168 -30 -245 -18 -166 -37 -322 -64 -540 -11 -88
-28 -223 -36 -300 -9 -77 -22 -192 -30 -255 -8 -63 -19 -158 -25 -210 -6 -52
-15 -124 -20 -160 -5 -36 -16 -128 -25 -205 -9 -77 -22 -189 -30 -250 -8 -60
-19 -159 -25 -220 -11 -104 -20 -180 -69 -570 -19 -152 -33 -277 -46 -410 -6
-59 -26 -110 -157 -400 -27 -60 -59 -130 -70 -155 -11 -25 -28 -63 -38 -85
-10 -22 -36 -80 -58 -130 -22 -49 -52 -117 -67 -150 -52 -115 -73 -161 -118
-265 -25 -58 -60 -133 -77 -168 -16 -34 -30 -64 -30 -67 0 -2 -16 -39 -36 -81
-20 -42 -62 -136 -94 -208 -101 -230 -181 -409 -221 -494 -22 -46 -39 -86 -39
-88 0 -2 -16 -38 -36 -80 -114 -244 -113 -509 2 -719 50 -91 188 -230 264
-266 126 -61 142 -64 325 -62 143 1 180 4 233 22 141 46 258 134 337 251 31
45 125 231 125 246 0 4 14 35 89 196 17 37 31 70 31 72 0 5 37 87 90 201 10
22 34 76 53 120 19 44 48 109 65 145 17 36 57 126 90 200 90 205 306 687 337
755 15 33 42 94 60 135 18 41 44 100 58 130 13 30 39 89 57 130 18 41 53 117
77 169 24 52 60 142 79 200 19 58 42 116 50 128 27 43 45 109 51 196 3 48 10
90 15 93 4 3 8 29 8 57 0 29 4 88 10 132 16 131 39 342 50 460 6 61 15 133 20
160 5 28 12 93 16 145 9 133 16 145 38 68 10 -35 31 -108 47 -163 16 -55 61
-210 100 -345 39 -135 95 -330 126 -435 30 -104 59 -203 63 -220 4 -16 29
-102 55 -190 26 -88 66 -228 90 -312 24 -84 55 -189 69 -235 14 -46 43 -146
65 -223 38 -133 76 -266 122 -420 11 -38 29 -99 39 -135 10 -36 34 -119 53
-185 74 -251 130 -441 137 -470 8 -29 40 -139 80 -275 11 -36 38 -128 60 -205
95 -334 233 -501 480 -582 44 -14 87 -17 210 -17 142 1 162 3 235 28 179 61
319 186 406 361 58 116 84 282 59 374 -5 20 -18 72 -29 116 -18 75 -35 132
-66 230 -7 22 -17 58 -24 80 -6 22 -27 94 -47 160 -20 66 -40 134 -44 150 -4
17 -27 95 -50 175 -23 80 -46 160 -51 178 -20 71 -30 104 -84 287 -31 105 -59
199 -62 210 -2 11 -8 29 -13 40 -4 11 -16 49 -25 85 -26 96 -39 141 -85 295
-23 77 -48 163 -55 190 -7 28 -23 82 -35 120 -12 39 -27 91 -34 117 -6 25 -14
50 -19 54 -4 4 -7 14 -7 23 0 17 -30 122 -61 212 -10 31 -19 65 -19 77 0 11
-4 24 -10 27 -5 3 -10 14 -10 24 0 18 -24 104 -40 146 -4 11 -16 49 -25 85 -9
36 -21 76 -26 90 -8 24 -73 244 -89 305 -5 17 -16 55 -25 85 -9 30 -20 69 -25
85 -4 17 -27 93 -50 170 -22 77 -45 154 -50 170 -5 17 -16 55 -25 85 -9 30
-20 69 -25 85 -22 78 -157 540 -192 655 -10 36 -27 94 -37 130 -24 83 -65 223
-95 325 -13 44 -36 121 -50 170 -15 50 -33 112 -41 139 -8 26 -15 73 -15 103
0 55 3 90 40 428 10 99 24 234 30 300 6 66 13 134 16 150 5 32 16 128 33 315
6 63 15 149 21 190 6 41 15 129 20 194 13 162 21 217 30 211 4 -3 18 -24 30
-47 21 -40 137 -228 235 -378 23 -36 80 -126 126 -199 122 -196 119 -193 509
-412 63 -36 126 -70 140 -77 14 -7 34 -18 45 -25 11 -7 56 -32 100 -57 44 -25
88 -49 97 -55 9 -5 70 -39 134 -75 147 -81 218 -120 267 -148 21 -13 71 -40
110 -62 40 -22 79 -45 87 -50 8 -6 25 -14 38 -20 12 -5 64 -34 115 -64 164
-96 173 -100 312 -136 201 -51 443 109 510 338 24 80 24 215 1 282 -43 125
-124 207 -296 297 -127 67 -344 185 -370 202 -14 8 -52 29 -85 47 -50 25 -202
108 -281 153 -33 18 -577 314 -619 336 -35 19 -63 58 -222 311 -101 159 -189
299 -195 312 -7 12 -101 162 -208 332 -107 171 -209 334 -226 362 -16 29 -50
85 -75 123 -25 39 -113 178 -195 310 -116 187 -167 258 -229 323 -138 145
-314 255 -475 296 -36 9 -78 21 -95 27 -39 13 -296 20 -355 10z"
        />
      </g>
    </svg>
  );
};

export default WalkingManSVG;
