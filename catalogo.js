/* Catálogo de ejercicios. Usa estos nombres exactos en las rutinas. */
const CATALOGO = [
  {
    "grupo": "pecho",
    "es": "Press de banca plano con barra",
    "en": "Barbell Flat Bench Press",
    "equipo": "barra"
  },
  {
    "grupo": "pecho",
    "es": "Press de banca inclinado con barra",
    "en": "Barbell Incline Bench Press",
    "equipo": "barra"
  },
  {
    "grupo": "pecho",
    "es": "Press de banca declinado con barra",
    "en": "Barbell Decline Bench Press",
    "equipo": "barra"
  },
  {
    "grupo": "pecho",
    "es": "Press de banca plano con mancuernas",
    "en": "Dumbbell Flat Bench Press",
    "equipo": "mancuerna"
  },
  {
    "grupo": "pecho",
    "es": "Press de banca inclinado con mancuernas",
    "en": "Dumbbell Incline Bench Press",
    "equipo": "mancuerna"
  },
  {
    "grupo": "pecho",
    "es": "Press de banca declinado con mancuernas",
    "en": "Dumbbell Decline Bench Press",
    "equipo": "mancuerna"
  },
  {
    "grupo": "pecho",
    "es": "Press de banca plano con mancuerna a una mano",
    "en": "Single-Arm Dumbbell Flat Bench Press",
    "equipo": "mancuerna"
  },
  {
    "grupo": "pecho",
    "es": "Press de banca inclinado con mancuerna a una mano",
    "en": "Single-Arm Dumbbell Incline Bench Press",
    "equipo": "mancuerna"
  },
  {
    "grupo": "pecho",
    "es": "Press sentado en máquina",
    "en": "Machine Chest Press",
    "equipo": "máquina"
  },
  {
    "grupo": "pecho",
    "es": "Press inclinado en máquina Hammer Strength",
    "en": "Hammer Strength Incline Press",
    "equipo": "máquina"
  },
  {
    "grupo": "pecho",
    "es": "Press en máquina guiada Smith",
    "en": "Smith Machine Bench Press",
    "equipo": "máquina"
  },
  {
    "grupo": "pecho",
    "es": "Aperturas en banco plano con mancuernas",
    "en": "Dumbbell Flat Flyes",
    "equipo": "mancuerna"
  },
  {
    "grupo": "pecho",
    "es": "Aperturas en banco inclinado con mancuernas",
    "en": "Dumbbell Incline Flyes",
    "equipo": "mancuerna"
  },
  {
    "grupo": "pecho",
    "es": "Aperturas en banco declinado con mancuernas",
    "en": "Dumbbell Decline Flyes",
    "equipo": "mancuerna"
  },
  {
    "grupo": "pecho",
    "es": "Cruce de poleas de arriba a abajo",
    "en": "High-to-Low Cable Crossover",
    "equipo": "cable"
  },
  {
    "grupo": "pecho",
    "es": "Cruce de poleas de abajo a arriba",
    "en": "Low-to-High Cable Crossover",
    "equipo": "cable"
  },
  {
    "grupo": "pecho",
    "es": "Cruce de poleas a la altura del pecho",
    "en": "Mid-Cable Crossover",
    "equipo": "cable"
  },
  {
    "grupo": "pecho",
    "es": "Contractor pectoral en máquina (Pec Deck)",
    "en": "Pec Deck Machine Flye",
    "equipo": "máquina"
  },
  {
    "grupo": "pecho",
    "es": "Fondos en paralelas para pecho",
    "en": "Chest Dips",
    "equipo": "peso corporal"
  },
  {
    "grupo": "pecho",
    "es": "Flexiones de pecho tradicionales",
    "en": "Push-Ups",
    "equipo": "peso corporal"
  },
  {
    "grupo": "pecho",
    "es": "Flexiones inclinadas",
    "en": "Incline Push-Ups",
    "equipo": "peso corporal"
  },
  {
    "grupo": "pecho",
    "es": "Flexiones declinadas",
    "en": "Decline Push-Ups",
    "equipo": "peso corporal"
  },
  {
    "grupo": "pecho",
    "es": "Press Landmine a dos manos",
    "en": "Landmine Chest Press",
    "equipo": "barra"
  },
  {
    "grupo": "pecho",
    "es": "Pullover con mancuerna para pecho",
    "en": "Dumbbell Chest Pullover",
    "equipo": "mancuerna"
  },
  {
    "grupo": "espalda",
    "es": "Peso muerto convencional",
    "en": "Conventional Deadlift",
    "equipo": "barra"
  },
  {
    "grupo": "espalda",
    "es": "Peso muerto Sumo",
    "en": "Sumo Deadlift",
    "equipo": "barra"
  },
  {
    "grupo": "espalda",
    "es": "Peso muerto con barra trampa",
    "en": "Trap Bar Deadlift",
    "equipo": "barra"
  },
  {
    "grupo": "espalda",
    "es": "Dominadas pronadas",
    "en": "Pull-Ups",
    "equipo": "peso corporal"
  },
  {
    "grupo": "espalda",
    "es": "Dominadas supinadas",
    "en": "Chin-Ups",
    "equipo": "peso corporal"
  },
  {
    "grupo": "espalda",
    "es": "Dominadas con agarre neutro",
    "en": "Neutral Grip Pull-Ups",
    "equipo": "peso corporal"
  },
  {
    "grupo": "espalda",
    "es": "Dominadas asistidas en máquina",
    "en": "Machine Assisted Pull-Ups",
    "equipo": "máquina"
  },
  {
    "grupo": "espalda",
    "es": "Jalón al pecho con agarre ancho",
    "en": "Wide-Grip Lat Pulldown",
    "equipo": "cable"
  },
  {
    "grupo": "espalda",
    "es": "Jalón al pecho con agarre estrecho",
    "en": "Close-Grip Lat Pulldown",
    "equipo": "cable"
  },
  {
    "grupo": "espalda",
    "es": "Jalón al pecho con agarre neutro",
    "en": "Neutral-Grip Lat Pulldown",
    "equipo": "cable"
  },
  {
    "grupo": "espalda",
    "es": "Jalón tras nuca",
    "en": "Behind-the-Neck Lat Pulldown",
    "equipo": "cable"
  },
  {
    "grupo": "espalda",
    "es": "Remo con barra inclinado",
    "en": "Bent-Over Barbell Row",
    "equipo": "barra"
  },
  {
    "grupo": "espalda",
    "es": "Remo con barra con agarre supinado",
    "en": "Reverse Grip Barbell Row",
    "equipo": "barra"
  },
  {
    "grupo": "espalda",
    "es": "Remo con mancuerna a una mano",
    "en": "Single-Arm Dumbbell Row",
    "equipo": "mancuerna"
  },
  {
    "grupo": "espalda",
    "es": "Remo con mancuernas a dos manos en banco inclinado",
    "en": "Incline Dumbbell Row",
    "equipo": "mancuerna"
  },
  {
    "grupo": "espalda",
    "es": "Remo en polea baja sentado (Gironda)",
    "en": "Seated Cable Row",
    "equipo": "cable"
  },
  {
    "grupo": "espalda",
    "es": "Remo en polea a una mano",
    "en": "Single-Arm Cable Row",
    "equipo": "cable"
  },
  {
    "grupo": "espalda",
    "es": "Remo en barra T apoyado",
    "en": "Chest-Supported T-Bar Row",
    "equipo": "máquina"
  },
  {
    "grupo": "espalda",
    "es": "Remo en barra T libre",
    "en": "Standing T-Bar Row",
    "equipo": "barra"
  },
  {
    "grupo": "espalda",
    "es": "Remo en máquina guiada Hammer Strength",
    "en": "Hammer Strength Row",
    "equipo": "máquina"
  },
  {
    "grupo": "espalda",
    "es": "Pullover con polea alta brazos rectos",
    "en": "Straight-Arm Cable Pulldown",
    "equipo": "cable"
  },
  {
    "grupo": "espalda",
    "es": "Hiperextensiones en banco de 45 grados",
    "en": "Back Extensions",
    "equipo": "peso corporal"
  },
  {
    "grupo": "espalda",
    "es": "Encogimientos de hombros con barra para trapecio",
    "en": "Barbell Shrugs",
    "equipo": "barra"
  },
  {
    "grupo": "espalda",
    "es": "Encogimientos de hombros con mancuernas",
    "en": "Dumbbell Shrugs",
    "equipo": "mancuerna"
  },
  {
    "grupo": "hombro",
    "es": "Press militar de pie con barra",
    "en": "Standing Barbell Overhead Press",
    "equipo": "barra"
  },
  {
    "grupo": "hombro",
    "es": "Press militar sentado con barra",
    "en": "Seated Barbell Overhead Press",
    "equipo": "barra"
  },
  {
    "grupo": "hombro",
    "es": "Press tras nuca con barra",
    "en": "Behind-the-Neck Barbell Press",
    "equipo": "barra"
  },
  {
    "grupo": "hombro",
    "es": "Press de hombro sentado con mancuernas",
    "en": "Seated Dumbbell Shoulder Press",
    "equipo": "mancuerna"
  },
  {
    "grupo": "hombro",
    "es": "Press de hombro de pie con mancuernas",
    "en": "Standing Dumbbell Shoulder Press",
    "equipo": "mancuerna"
  },
  {
    "grupo": "hombro",
    "es": "Press Arnold con mancuernas",
    "en": "Arnold Press",
    "equipo": "mancuerna"
  },
  {
    "grupo": "hombro",
    "es": "Press de hombro en máquina guiada Smith",
    "en": "Smith Machine Shoulder Press",
    "equipo": "máquina"
  },
  {
    "grupo": "hombro",
    "es": "Press de hombros en máquina de palanca",
    "en": "Lever Shoulder Press",
    "equipo": "máquina"
  },
  {
    "grupo": "hombro",
    "es": "Elevaciones laterales con mancuernas",
    "en": "Dumbbell Lateral Raises",
    "equipo": "mancuerna"
  },
  {
    "grupo": "hombro",
    "es": "Elevaciones laterales en polea baja",
    "en": "Cable Lateral Raises",
    "equipo": "cable"
  },
  {
    "grupo": "hombro",
    "es": "Elevaciones laterales en polea a una mano",
    "en": "Single-Arm Cable Lateral Raise",
    "equipo": "cable"
  },
  {
    "grupo": "hombro",
    "es": "Elevaciones laterales en máquina",
    "en": "Machine Lateral Raise",
    "equipo": "máquina"
  },
  {
    "grupo": "hombro",
    "es": "Elevaciones frontales con barra",
    "en": "Barbell Front Raise",
    "equipo": "barra"
  },
  {
    "grupo": "hombro",
    "es": "Elevaciones frontales con mancuernas",
    "en": "Dumbbell Front Raise",
    "equipo": "mancuerna"
  },
  {
    "grupo": "hombro",
    "es": "Elevaciones frontales con disco",
    "en": "Plate Front Raise",
    "equipo": "otro"
  },
  {
    "grupo": "hombro",
    "es": "Elevaciones frontales en polea baja",
    "en": "Cable Front Raise",
    "equipo": "cable"
  },
  {
    "grupo": "hombro",
    "es": "Pájaros / Elevaciones posteriores con mancuernas",
    "en": "Dumbbell Rear Delt Flyes",
    "equipo": "mancuerna"
  },
  {
    "grupo": "hombro",
    "es": "Pájaros en polea alta / Cruce posterior",
    "en": "Cable Rear Delt Flyes",
    "equipo": "cable"
  },
  {
    "grupo": "hombro",
    "es": "Reverse Pec Deck para deltoides posterior",
    "en": "Reverse Pec Deck",
    "equipo": "máquina"
  },
  {
    "grupo": "hombro",
    "es": "Face Pulls en polea alta",
    "en": "Cable Face Pulls",
    "equipo": "cable"
  },
  {
    "grupo": "hombro",
    "es": "Remolque al mentón con barra (Upright Row)",
    "en": "Barbell Upright Row",
    "equipo": "barra"
  },
  {
    "grupo": "hombro",
    "es": "Remolque al mentón con polea",
    "en": "Cable Upright Row",
    "equipo": "cable"
  },
  {
    "grupo": "bíceps",
    "es": "Curl de bíceps de pie con barra recta",
    "en": "Standing Barbell Curl",
    "equipo": "barra"
  },
  {
    "grupo": "bíceps",
    "es": "Curl de bíceps de pie con barra EZ",
    "en": "EZ-Bar Biceps Curl",
    "equipo": "barra"
  },
  {
    "grupo": "bíceps",
    "es": "Curl de bíceps alterno de pie con mancuernas",
    "en": "Alternating Dumbbell Curl",
    "equipo": "mancuerna"
  },
  {
    "grupo": "bíceps",
    "es": "Curl de bíceps simultáneo con mancuernas",
    "en": "Dumbbell Biceps Curl",
    "equipo": "mancuerna"
  },
  {
    "grupo": "bíceps",
    "es": "Curl de bíceps en banco inclinado con mancuernas",
    "en": "Incline Dumbbell Curl",
    "equipo": "mancuerna"
  },
  {
    "grupo": "bíceps",
    "es": "Curl Predicador con barra EZ en banco Scott",
    "en": "EZ-Bar Preacher Curl",
    "equipo": "barra"
  },
  {
    "grupo": "bíceps",
    "es": "Curl Predicador con mancuerna a una mano",
    "en": "Single-Arm Dumbbell Preacher Curl",
    "equipo": "mancuerna"
  },
  {
    "grupo": "bíceps",
    "es": "Curl Predicador en máquina",
    "en": "Machine Preacher Curl",
    "equipo": "máquina"
  },
  {
    "grupo": "bíceps",
    "es": "Curl concentrado con mancuerna",
    "en": "Dumbbell Concentration Curl",
    "equipo": "mancuerna"
  },
  {
    "grupo": "bíceps",
    "es": "Curl martillo de pie con mancuernas",
    "en": "Standing Dumbbell Hammer Curl",
    "equipo": "mancuerna"
  },
  {
    "grupo": "bíceps",
    "es": "Curl martillo cruzado al pecho",
    "en": "Cross-Body Hammer Curl",
    "equipo": "mancuerna"
  },
  {
    "grupo": "bíceps",
    "es": "Curl martillo en polea baja con cuerda",
    "en": "Cable Rope Hammer Curl",
    "equipo": "cable"
  },
  {
    "grupo": "bíceps",
    "es": "Curl de bíceps en polea baja con barra recta",
    "en": "Cable Biceps Curl",
    "equipo": "cable"
  },
  {
    "grupo": "bíceps",
    "es": "Curl de bíceps acostado en polea alta",
    "en": "Overhead Cable Biceps Curl",
    "equipo": "cable"
  },
  {
    "grupo": "bíceps",
    "es": "Curl Zottman con mancuernas",
    "en": "Zottman Curl",
    "equipo": "mancuerna"
  },
  {
    "grupo": "bíceps",
    "es": "Curl araña en banco inclinado con barra EZ",
    "en": "Spider Curl",
    "equipo": "barra"
  },
  {
    "grupo": "tríceps",
    "es": "Press francés acostado con barra EZ (Rompecráneos)",
    "en": "EZ-Bar Skullcrusher",
    "equipo": "barra"
  },
  {
    "grupo": "tríceps",
    "es": "Press francés acostado con mancuernas",
    "en": "Dumbbell Skullcrusher",
    "equipo": "mancuerna"
  },
  {
    "grupo": "tríceps",
    "es": "Press de banca con agarre cerrado",
    "en": "Close-Grip Bench Press",
    "equipo": "barra"
  },
  {
    "grupo": "tríceps",
    "es": "Fondos en barras paralelas para tríceps",
    "en": "Triceps Dips",
    "equipo": "peso corporal"
  },
  {
    "grupo": "tríceps",
    "es": "Fondos en máquina asistida",
    "en": "Machine Assisted Dips",
    "equipo": "máquina"
  },
  {
    "grupo": "tríceps",
    "es": "Fondos entre bancos",
    "en": "Bench Dips",
    "equipo": "peso corporal"
  },
  {
    "grupo": "tríceps",
    "es": "Extensiones de tríceps en polea alta con barra recta",
    "en": "Straight-Bar Triceps Pushdown",
    "equipo": "cable"
  },
  {
    "grupo": "tríceps",
    "es": "Extensiones de tríceps en polea alta con barra V",
    "en": "V-Bar Triceps Pushdown",
    "equipo": "cable"
  },
  {
    "grupo": "tríceps",
    "es": "Extensiones de tríceps en polea alta con cuerda",
    "en": "Rope Triceps Pushdown",
    "equipo": "cable"
  },
  {
    "grupo": "tríceps",
    "es": "Extensiones de tríceps a una mano en polea alta",
    "en": "Single-Arm Cable Pushdown",
    "equipo": "cable"
  },
  {
    "grupo": "tríceps",
    "es": "Extensiones de tríceps tras nuca con mancuerna a dos manos",
    "en": "Dumbbell Overhead Triceps Extension",
    "equipo": "mancuerna"
  },
  {
    "grupo": "tríceps",
    "es": "Extensiones de tríceps tras nuca con mancuerna a una mano",
    "en": "Single-Arm Overhead Dumbbell Extension",
    "equipo": "mancuerna"
  },
  {
    "grupo": "tríceps",
    "es": "Extensiones de tríceps tras nuca con barra EZ",
    "en": "EZ-Bar Overhead Triceps Extension",
    "equipo": "barra"
  },
  {
    "grupo": "tríceps",
    "es": "Extensiones de tríceps tras nuca en polea alta con cuerda",
    "en": "Cable Overhead Triceps Extension",
    "equipo": "cable"
  },
  {
    "grupo": "tríceps",
    "es": "Patada de tríceps con mancuerna",
    "en": "Dumbbell Triceps Kickback",
    "equipo": "mancuerna"
  },
  {
    "grupo": "tríceps",
    "es": "Patada de tríceps en polea baja",
    "en": "Cable Triceps Kickback",
    "equipo": "cable"
  },
  {
    "grupo": "antebrazo",
    "es": "Curl de muñeca con barra en agarre supinado",
    "en": "Barbell Wrist Curl",
    "equipo": "barra"
  },
  {
    "grupo": "antebrazo",
    "es": "Curl de muñeca invertido con barra en agarre pronado",
    "en": "Barbell Reverse Wrist Curl",
    "equipo": "barra"
  },
  {
    "grupo": "antebrazo",
    "es": "Curl de muñeca con mancuernas",
    "en": "Dumbbell Wrist Curl",
    "equipo": "mancuerna"
  },
  {
    "grupo": "antebrazo",
    "es": "Curl de muñeca invertido con mancuernas",
    "en": "Dumbbell Reverse Wrist Curl",
    "equipo": "mancuerna"
  },
  {
    "grupo": "antebrazo",
    "es": "Curl inverso con barra EZ",
    "en": "EZ-Bar Reverse Curl",
    "equipo": "barra"
  },
  {
    "grupo": "antebrazo",
    "es": "Curl inverso de pie con barra recta",
    "en": "Barbell Reverse Curl",
    "equipo": "barra"
  },
  {
    "grupo": "antebrazo",
    "es": "Paseo del granjero con mancuernas (Farmer's Walk)",
    "en": "Farmer's Walk",
    "equipo": "mancuerna"
  },
  {
    "grupo": "antebrazo",
    "es": "Suspensión de agarre en barra fija (Dead Hang)",
    "en": "Barbell or Bar Dead Hang",
    "equipo": "peso corporal"
  },
  {
    "grupo": "antebrazo",
    "es": "Rodillo de muñeca con disco (Wrist Roller)",
    "en": "Wrist Roller",
    "equipo": "otro"
  },
  {
    "grupo": "antebrazo",
    "es": "Agarre con pinza de discos",
    "en": "Plate Pinch Hold",
    "equipo": "otro"
  },
  {
    "grupo": "cuádriceps",
    "es": "Sentadilla trasera con barra",
    "en": "Barbell Back Squat",
    "equipo": "barra"
  },
  {
    "grupo": "cuádriceps",
    "es": "Sentadilla frontal con barra",
    "en": "Barbell Front Squat",
    "equipo": "barra"
  },
  {
    "grupo": "cuádriceps",
    "es": "Sentadilla Goblet con mancuerna",
    "en": "Dumbbell Goblet Squat",
    "equipo": "mancuerna"
  },
  {
    "grupo": "cuádriceps",
    "es": "Sentadilla Goblet con kettlebell",
    "en": "Kettlebell Goblet Squat",
    "equipo": "otro"
  },
  {
    "grupo": "cuádriceps",
    "es": "Sentadilla búlgara con mancuernas",
    "en": "Bulgarian Split Squat",
    "equipo": "mancuerna"
  },
  {
    "grupo": "cuádriceps",
    "es": "Sentadilla búlgara con barra",
    "en": "Barbell Bulgarian Split Squat",
    "equipo": "barra"
  },
  {
    "grupo": "cuádriceps",
    "es": "Prensa de piernas inclinado a 45 grados",
    "en": "45-Degree Leg Press",
    "equipo": "máquina"
  },
  {
    "grupo": "cuádriceps",
    "es": "Prensa de piernas horizontal",
    "en": "Horizontal Leg Press",
    "equipo": "máquina"
  },
  {
    "grupo": "cuádriceps",
    "es": "Prensa de piernas unilateral",
    "en": "Single-Leg Leg Press",
    "equipo": "máquina"
  },
  {
    "grupo": "cuádriceps",
    "es": "Sentadilla Hack en máquina",
    "en": "Hack Squat",
    "equipo": "máquina"
  },
  {
    "grupo": "cuádriceps",
    "es": "Extensiones de cuádriceps en máquina",
    "en": "Leg Extensions",
    "equipo": "máquina"
  },
  {
    "grupo": "cuádriceps",
    "es": "Extensiones de cuádriceps unilaterales",
    "en": "Single-Leg Extension",
    "equipo": "máquina"
  },
  {
    "grupo": "cuádriceps",
    "es": "Sentadilla Sissy",
    "en": "Sissy Squat",
    "equipo": "peso corporal"
  },
  {
    "grupo": "cuádriceps",
    "es": "Zancadas caminadas con mancuernas",
    "en": "Walking Dumbbell Lunges",
    "equipo": "mancuerna"
  },
  {
    "grupo": "cuádriceps",
    "es": "Zancadas caminadas con barra",
    "en": "Walking Barbell Lunges",
    "equipo": "barra"
  },
  {
    "grupo": "cuádriceps",
    "es": "Sentadilla en máquina Smith",
    "en": "Smith Machine Squat",
    "equipo": "máquina"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Peso muerto rumano con barra",
    "en": "Barbell Romanian Deadlift",
    "equipo": "barra"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Peso muerto rumano con mancuernas",
    "en": "Dumbbell Romanian Deadlift",
    "equipo": "mancuerna"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Peso muerto con piernas rígidas",
    "en": "Stiff-Legged Deadlift",
    "equipo": "barra"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Peso muerto unilateral con mancuerna",
    "en": "Single-Leg Dumbbell Romanian Deadlift",
    "equipo": "mancuerna"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Curl femoral tumbado en máquina",
    "en": "Lying Leg Curl",
    "equipo": "máquina"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Curl femoral tumbado unilateral",
    "en": "Single-Leg Lying Curl",
    "equipo": "máquina"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Curl femoral sentado en máquina",
    "en": "Seated Leg Curl",
    "equipo": "máquina"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Curl femoral de pie en máquina",
    "en": "Standing Leg Curl",
    "equipo": "máquina"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Flexión femoral con balón suizo",
    "en": "Swiss Ball Hamstring Curl",
    "equipo": "otro"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Flexión femoral en TRX / suspensión",
    "en": "TRX Hamstring Curl",
    "equipo": "otro"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Glute Ham Raise (GHR)",
    "en": "Glute Ham Raise",
    "equipo": "peso corporal"
  },
  {
    "grupo": "isquiotibiales",
    "es": "Buenos días con barra (Good Mornings)",
    "en": "Barbell Good Mornings",
    "equipo": "barra"
  },
  {
    "grupo": "glúteos",
    "es": "Hip Thrust con barra en banco",
    "en": "Barbell Hip Thrust",
    "equipo": "barra"
  },
  {
    "grupo": "glúteos",
    "es": "Hip Thrust en máquina",
    "en": "Machine Hip Thrust",
    "equipo": "máquina"
  },
  {
    "grupo": "glúteos",
    "es": "Hip Thrust unilateral con peso corporal o mancuerna",
    "en": "Single-Leg Hip Thrust",
    "equipo": "mancuerna"
  },
  {
    "grupo": "glúteos",
    "es": "Puente de glúteos en suelo con barra",
    "en": "Barbell Glute Bridge",
    "equipo": "barra"
  },
  {
    "grupo": "glúteos",
    "es": "Patada de glúteo en polea baja",
    "en": "Cable Glute Kickback",
    "equipo": "cable"
  },
  {
    "grupo": "glúteos",
    "es": "Patada de glúteo en máquina",
    "en": "Machine Glute Kickback",
    "equipo": "máquina"
  },
  {
    "grupo": "glúteos",
    "es": "Abducción de cadera en máquina sentada",
    "en": "Seated Hip Abduction Machine",
    "equipo": "máquina"
  },
  {
    "grupo": "glúteos",
    "es": "Abducción de cadera de pie en polea",
    "en": "Standing Cable Hip Abduction",
    "equipo": "cable"
  },
  {
    "grupo": "glúteos",
    "es": "Step-up / Subidas al banco con mancuernas",
    "en": "Dumbbell Step-Up",
    "equipo": "mancuerna"
  },
  {
    "grupo": "glúteos",
    "es": "Sentadilla Sumo con mancuerna",
    "en": "Dumbbell Sumo Squat",
    "equipo": "mancuerna"
  },
  {
    "grupo": "glúteos",
    "es": "Caminata lateral con banda elástica",
    "en": "Banded Lateral Walk",
    "equipo": "otro"
  },
  {
    "grupo": "glúteos",
    "es": "Hiperextensiones de glúteo a 45 grados (espalda redondeada)",
    "en": "45-Degree Glute Extension",
    "equipo": "peso corporal"
  },
  {
    "grupo": "pantorrillas",
    "es": "Elevación de talones de pie en máquina",
    "en": "Standing Machine Calf Raise",
    "equipo": "máquina"
  },
  {
    "grupo": "pantorrillas",
    "es": "Elevación de talones de pie con barra",
    "en": "Standing Barbell Calf Raise",
    "equipo": "barra"
  },
  {
    "grupo": "pantorrillas",
    "es": "Elevación de talones de pie con mancuernas",
    "en": "Standing Dumbbell Calf Raise",
    "equipo": "mancuerna"
  },
  {
    "grupo": "pantorrillas",
    "es": "Elevación de talones sentado en máquina",
    "en": "Seated Calf Raise Machine",
    "equipo": "máquina"
  },
  {
    "grupo": "pantorrillas",
    "es": "Elevación de talones en prensa de piernas",
    "en": "Leg Press Calf Raise",
    "equipo": "máquina"
  },
  {
    "grupo": "pantorrillas",
    "es": "Elevación de talones en máquina Smith",
    "en": "Smith Machine Calf Raise",
    "equipo": "máquina"
  },
  {
    "grupo": "pantorrillas",
    "es": "Elevación de talones unilateral de pie",
    "en": "Single-Leg Standing Calf Raise",
    "equipo": "mancuerna"
  },
  {
    "grupo": "pantorrillas",
    "es": "Elevación de talones en posición de sentadilla (Donkey Calf Raise)",
    "en": "Donkey Calf Raise",
    "equipo": "máquina"
  },
  {
    "grupo": "pantorrillas",
    "es": "Flexión tibial anterior en máquina o polea",
    "en": "Tibialis Raise",
    "equipo": "otro"
  },
  {
    "grupo": "pantorrillas",
    "es": "Elevación de talones con pesas rusas",
    "en": "Kettlebell Calf Raise",
    "equipo": "otro"
  },
  {
    "grupo": "abdomen",
    "es": "Encogimiento abdominal tradicional (Crunch)",
    "en": "Abdominal Crunch",
    "equipo": "peso corporal"
  },
  {
    "grupo": "abdomen",
    "es": "Encogimientos abdominales en polea alta (Cable Crunch)",
    "en": "Cable Crunch",
    "equipo": "cable"
  },
  {
    "grupo": "abdomen",
    "es": "Encogimientos abdominales en banco inclinado",
    "en": "Incline Board Crunch",
    "equipo": "peso corporal"
  },
  {
    "grupo": "abdomen",
    "es": "Elevación de piernas colgado en barra",
    "en": "Hanging Leg Raise",
    "equipo": "peso corporal"
  },
  {
    "grupo": "abdomen",
    "es": "Elevación de rodillas colgado en barra",
    "en": "Hanging Knee Raise",
    "equipo": "peso corporal"
  },
  {
    "grupo": "abdomen",
    "es": "Elevación de piernas en silla romana (Capitán)",
    "en": "Captain's Chair Leg Raise",
    "equipo": "peso corporal"
  },
  {
    "grupo": "abdomen",
    "es": "Encogimiento inverso en suelo / banco",
    "en": "Reverse Crunch",
    "equipo": "peso corporal"
  },
  {
    "grupo": "abdomen",
    "es": "Rueda abdominal (Ab Wheel Rollout)",
    "en": "Ab Wheel Rollout",
    "equipo": "otro"
  },
  {
    "grupo": "abdomen",
    "es": "Plancha frontal isométrica",
    "en": "Forearm Plank",
    "equipo": "peso corporal"
  },
  {
    "grupo": "abdomen",
    "es": "Plancha lateral isométrica",
    "en": "Side Plank",
    "equipo": "peso corporal"
  },
  {
    "grupo": "abdomen",
    "es": "Giros rusos con disco o mancuerna (Russian Twist)",
    "en": "Russian Twist",
    "equipo": "otro"
  },
  {
    "grupo": "abdomen",
    "es": "Press Pallof en polea",
    "en": "Pallof Press",
    "equipo": "cable"
  },
  {
    "grupo": "abdomen",
    "es": "Leñador en polea de arriba a abajo (Cable Woodchopper)",
    "en": "Cable Woodchopper",
    "equipo": "cable"
  },
  {
    "grupo": "abdomen",
    "es": "Flexión lateral del tronco con mancuerna (Dumbbell Side Bend)",
    "en": "Dumbbell Side Bend",
    "equipo": "mancuerna"
  },
  {
    "grupo": "abdomen",
    "es": "Navaja / V-ups en suelo",
    "en": "V-Ups",
    "equipo": "peso corporal"
  }
];
