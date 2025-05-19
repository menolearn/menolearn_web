import { NetworkNodeType, NodeCategory } from "@/types"
import {
  BriefcaseMedical,
  CircleHelp,
  FileQuestion,
  Flame,
  HandHeart,
  Handshake,
  Leaf,
} from "lucide-react"

const iconDict = {
  ["question"]: CircleHelp,
  ["quiz"]: FileQuestion,
  ["support"]: Handshake,
  ["relief"]: HandHeart,
  ["pharmacological"]: BriefcaseMedical,
  ["alternative"]: Leaf,
}

const initialNodes: NetworkNodeType[] = [
  {
    id: "1",
    type: "network",
    data: {
      label: "What Is Menopause?",
      category: NodeCategory.initial,
    },
    position: { x: 0, y: 0 },
    connectsTo: ["1a", "1b", "1c", "1d"],
  },
  {
    id: "1a",
    type: "network",
    data: {
      label: "Treatments",
      category: NodeCategory.initial,
      icon: iconDict["relief"],
    },
    position: { x: -100, y: 100 },
    connectsTo: ["2a", "2b"],
  },
  {
    id: "1b",
    type: "network",
    data: {
      label: "Symptoms",
      category: NodeCategory.initial,
      icon: iconDict["support"],
    },
    position: { x: 500, y: 300 },
    connectsTo: ["5a", "5b", "5c", "5d"],
  },
  {
    id: "1c",
    type: "network",
    data: {
      label: "Got Questions?",
      category: NodeCategory.initial,
      icon: iconDict["question"],
    },
    position: { x: 720, y: 300 },
    connectsTo: [],
  },
  {
    id: "1d",
    type: "network",
    data: {
      label: "Take A Quiz",
      category: NodeCategory.initial,
      icon: iconDict["quiz"],
    },
    position: { x: 300, y: 300 },
    connectsTo: [],
  },
]

const treatmentNodes: NetworkNodeType[] = [
  {
    id: "2a",
    type: "network",
    data: {
      label: "Pharmacological",
      category: NodeCategory.relief,
      description: {
        generic:
          "This encompasses all treatments that involve drugs or medications, whether over-the-counter or prescription.",
      },
      icon: iconDict["pharmacological"],
    },
    position: { x: -100, y: 400 },
    connectsTo: ["3a", "3b", "3c"],
  },
  {
    id: "2b",
    type: "network",
    data: {
      label: "Alternative",
      category: NodeCategory.relief,
      description: {
        generic:
          "This encompasses all treatments that involve lifestyle changes, therapies, and herbal or supplemental remedies.",
      },
      icon: iconDict["alternative"],
    },
    position: { x: 200, y: 400 },
    connectsTo: ["6b", "6c", "6d"],
  },
]

const pharmacologicalNodes: NetworkNodeType[] = [
  {
    id: "3a",
    type: "network",
    data: {
      label: "HRT/MHT",
      category: NodeCategory.pharma,
      description: {
        generic:
          "Hormone-based treatments that use estrogen and/or progesterone to manage symptoms like hot flashes, bone loss, and vaginal dryness. They come in various forms, including oral tablets (e.g., combined oral contraceptives), transdermal patches, topical gels, creams, injections, and intrauterine devices.",
      },
    },
    position: { x: -300, y: 300 },
    connectsTo: ["4a", "4b", "4c"],
  },
  {
    id: "3b",
    type: "network",
    data: {
      label: "Other Novel Hormonal",
      category: NodeCategory.pharma,
      description: {
        generic:
          "Alternative hormones, hormonal compounds or selective estrogen receptor modulators (SERMs) provide symptom relief with different safety profiles and targeted effects. Includes Tibolone (Livial), Testosterone, Tissue-Selective Estrogen Complexes (TSEC) like Duavee, and Ospemifene, offering symptom relief while minimizing risks associated with systemic estrogen use. These therapies come in various forms, including oral tablets, patches, and gels.",
      },
    },
    position: { x: -500, y: 300 },
    connectsTo: ["7a", "7b", "7c", "7d"],
  },
  {
    id: "3c",
    type: "network",
    data: {
      label: "Non-Hormonal",
      category: NodeCategory.pharma,
      description: {
        generic:
          "Offer menopause symptom relief without estrogen or progesterone. This includes NK3 receptor antagonists like Fezolinetan and medications such as Clonidine, Gabapentin, and antidepressants (SSRIs, SNRIs like Effexor and Lexapro).",
      },
    },
    position: { x: -700, y: 300 },
    connectsTo: ["8a", "8b", "8c", "8d"],
  },
]

const HRTMHTNodes: NetworkNodeType[] = [
  {
    id: "4a",
    type: "network",
    data: {
      label: "EPT",
      category: NodeCategory.hrt,
      description: {
        generic:
          "“EPT” refers to Estrogen-Progestin therapy. This is a type of combination hormone replacement therapy that combines estrogen and progestin, a synthetic form of progesterone, to treat menopausal symptoms in women who still have a uterus.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "4b",
    type: "network",
    data: {
      label: "ET",
      category: NodeCategory.hrt,
      description: {
        generic:
          "'ET' stands for 'Estrogen Therapy,' which refers to the treatment that consists of only estrogen hormones to alleviate symptoms associated with menopause, typically prescribed for women who have had a hysterectomy.",
      },
    },
    position: { x: -700, y: 500 },
    connectsTo: [],
  },
  {
    id: "4c",
    type: "network",
    data: {
      label: "Progesterone",
      category: NodeCategory.hrt,
      description: {
        generic:
          "Progesterone is recommended to be used in combination with Estrogen (EPT). LNG-IUS is a solely progestin-based intrauterine device. Unless used in combination with oral or percutaneous estrogen, progesterone-only therapy is typically prescribed to those with contraindications to estrogen.",
      },
    },
    position: { x: 0, y: 500 },
    connectsTo: [],
  },
]

const symptomNodes: NetworkNodeType[] = [
  {
    id: "5a",
    type: "network",
    data: {
      label: "Mental Health",
      category: NodeCategory.support,
      description: {
        generic:
          "These symptoms include increased feelings of anxiety, depression, moodiness, irritation, difficulty concentrating, or brain fog.",
      },
    },
    position: { x: 300, y: 300 },
    connectsTo: ["13a", "13b", "13c", "13d", "13e"],
  },
  {
    id: "5b",
    type: "network",
    data: {
      label: "Vasomotor",
      category: NodeCategory.support,
      description: {
        generic:
          "The class of symptoms associated primarily with the decline in estrogen levels during menopause. As estrogen decreases, blood vessels become more sensitive to changes in temperature, leading to hot flashes and night sweats. These also include perpiration, High Blood Pressure, Tachycardia, Heart Palpitations",
      },
    },
    position: { x: 500, y: 300 },
    connectsTo: ["14a", "14b", "14c", "14d"],
  },
  {
    id: "5c",
    type: "network",
    data: {
      label: "Genitourinary",
      category: NodeCategory.support,
      description: {
        generic:
          "Encompasses Genital Issues, Urinary Issues, and Menstrual issues. These include vaginal dryness, itching, burning, irritation, urinary urgency, incontinence, UTIs, irregular periods, bleeding, and spotting.",
      },
    },
    position: { x: 400, y: 300 },
    connectsTo: ["15a", "15b"],
  },
  {
    id: "5d",
    type: "network",
    data: {
      label: "Other Symptoms",
      category: NodeCategory.support,
      description: {
        generic:
          "Headaches, acne, breast tenderness, hair thinning, hair fall, gastrontestinal, decreased libido, pain during sex, fatigue, insomnia, poor sleep",
      },
    },
    position: { x: 400, y: 300 },
    connectsTo: [],
  },
]

const alternativeTreatmentNodes: NetworkNodeType[] = [
  {
    id: "6b",
    type: "network",
    data: {
      label: "Therapy",
      category: NodeCategory.alternative,
      description: {
        generic:
          "Non-medical options for managing menopause symptoms. CBT helps reframe negative thoughts and develop coping strategies for issues like mood swings, anxiety, and sleep disturbances. Hypnosis works by altering perception, potentially reducing symptoms such as hot flashes and stress. ",
      },
    },
    position: { x: -200, y: 300 },
    connectsTo: ["9a", "9b"],
  },
  {
    id: "6c",
    type: "network",
    data: {
      label: "Lifestyle",
      category: NodeCategory.alternative,
      description: {
        generic:
          "Non-medical strategies like exercise, weight loss, and diet, management help manage symptoms naturally. Yoga and meditation reduce stress, and can aid mood and sleep. These approaches support long-term well-being and can complement other treatments.",
      },
    },
    position: { x: 200, y: 300 },
    connectsTo: ["11a", "11b", "11c", "11d", "11e"],
  },
  {
    id: "6d",
    type: "network",
    data: {
      label: "Supplemental",
      category: NodeCategory.alternative,
      description: {
        generic:
          "Plant-based remedies like red clover, black cohosh, soy, and isoflavones provide  phytoestrogens that may ease menopause symptoms. Omega-3s support mood, while S-equol enhances soy's effects. Compounded bioidentical hormones and natural estrogen are marketed as alternatives to traditional HRT, though effectiveness varies.",
      },
    },
    position: { x: 400, y: 300 },
    connectsTo: ["12a", "12b", "12c", "12d"],
  },
]

const otherNovelHormonalNodes: NetworkNodeType[] = [
  {
    id: "7a",
    type: "network",
    data: {
      label: "Tibolone",
      category: NodeCategory.otherNovelHormonal,
      description: {
        generic:
          "Tibolone is a unique hormone therapy that works like estrogen, progesterone, and testosterone through its metabolites. It helps relieve menopausal symptoms such as hot flashes, fatigue, headaches, and insomnia, while also protecting bone health and reducing risks of certain cancers.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "7b",
    type: "network",
    data: {
      label: "TSEC (Tissue-Selective Estrogen Complex)",
      category: NodeCategory.otherNovelHormonal,
      description: {
        generic:
          "Combines Bazedoxifene, a selective estrogen-receptor modulator with one or more estrogens and is designed to treat menopausal symptoms and prevent postmenopausal osteoporosis without the tolerability concerns associated with EPT. Studies of up to 2 years in duration suggest that the combination of BZA plus CEE provides endometrial protection without the need for a progestogen.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "7c",
    type: "network",
    data: {
      label: "Testosterone",
      category: NodeCategory.otherNovelHormonal,
      description: {
        generic:
          "Supplementing treatment with testosterone can help with sexual desire and distress in menopausal women. However, there is limited evidence to support testosterone therapy for other uses, such as bone density, hot flashes, and mood.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "7d",
    type: "network",
    data: {
      label: "SERM (Selective Estrogen Receptor Modulator)",
      category: NodeCategory.otherNovelHormonal,
      description: {
        generic:
          "A class of drugs used to manage menopause symptoms, primarily by acting like estrogen in some tissues to prevent bone loss, while simultaneously blocking estrogen in other tissues to reduce the risk of certain cancers.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
]

const nonHormonalNodes: NetworkNodeType[] = [
  {
    id: "8a",
    type: "network",
    data: {
      label: "Antidepressants",
      category: NodeCategory.nonHormonal,
      description: {
        generic:
          "Mild-to-moderate efficacy in reducing hot flashes, even in breast cancer survivors who cannot use hormone therapy. They are generally well tolerated, though caution is necessary for individuals with bipolar disorder, uncontrolled seizures, or poorly managed hypertension",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "8b",
    type: "network",
    data: {
      label: "Clonidine",
      category: NodeCategory.nonHormonal,
      description: {
        generic:
          "Used to reduce hot flashes but is less effective than SSRIs, SNRIs, gabapentin, or pregabalin. It has more side effects compared to these alternatives. Transdermal patches are preferred over tablets due to their ability to maintain more stable blood levels.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "8c",
    type: "network",
    data: {
      label: "Gabapentin",
      category: NodeCategory.nonHormonal,
      description: {
        generic:
          "Reduces the severity of hot flashes, particularly at night. Its sedative properties help reduce vasomotor instability when taken at bedtime, with side effects like drowsiness typically wearing off by morning. However, daytime use may cause intolerable lethargy.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "8d",
    type: "network",
    data: {
      label: "Fezolinetant",
      category: NodeCategory.nonHormonal,
      description: {
        generic:
          "Reduces the frequency and severity of hot flashes in menopausal women. Improves menopause-related quality of life, though the effect size is below the clinically important difference. Generally well tolerated, with headache as the most common side effect and mild, reversible liver enzyme elevations in some users.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
]

const therapyNodes: NetworkNodeType[] = [
  {
    id: "9a",
    type: "network",
    data: {
      label: "CBT",
      category: NodeCategory.therapy,
      description: {
        generic:
          "CBT is an effective, evidence-based treatment for managing menopausal symptoms, particularly those related to mental health and sleep disturbances. CBT helps individuals develop coping strategies to manage anxiety, depression, and mood swings. It also addresses unhelpful thought patterns that can worsen symptoms like hot flashes, night sweats, and insomnia.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: ["10a", "10b", "10c"],
  },
  {
    id: "9b",
    type: "network",
    data: {
      label: "Hypnosis",
      category: NodeCategory.therapy,
      description: {
        generic:
          "Hypnosis is a recognized non-hormonal intervention that may help manage certain menopausal symptoms, particularly hot flashes and sleep disturbances. Hypnosis involves guided relaxation, focused attention, and mental imagery techniques that can reduce the intensity and frequency of vasomotor symptoms such as hot flashes. It may also improve stress management, anxiety, and sleep quality.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
]

const cbtNodes: NetworkNodeType[] = [
  {
    id: "10a",
    type: "network",
    data: {
      label: "Individual CBT",
      category: NodeCategory.cbt,
      description: {
        generic:
          "A one-on-one therapeutic approach that focuses on identifying and modifying negative thought patterns, improving coping strategies, and managing symptoms such as anxiety, mood swings, and insomnia.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "10b",
    type: "network",
    data: {
      label: "Guided Self-Help CBT",
      category: NodeCategory.cbt,
      description: {
        generic:
          "In this approach, individuals follow structured CBT materials (e.g., workbooks, online programs) with occasional guidance from a therapist. This method is effective for managing hot flashes, night sweats, and sleep disturbances.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "10c",
    type: "network",
    data: {
      label: "Group CBT",
      category: NodeCategory.cbt,
      description: {
        generic:
          "Delivered in a group setting, this format allows participants to share experiences, learn coping strategies, and build social support, which can be particularly helpful for reducing stress and improving emotional well-being.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
]

const lifestyleNodes: NetworkNodeType[] = [
  {
    id: "11a",
    type: "network",
    data: {
      label: "Physical Activity",
      category: NodeCategory.lifestyle,
      description: {
        generic:
          "This can have indirect benefits​, such as reducing physiological stress responses that exacerbate symptoms and promoting overall well-being and mild symptom relief. Regular aerobic exercise, strength training, and activities like yoga or tai chi can improve mood, sleep quality, and reduce hot flashes and anxiety.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "11b",
    type: "network",
    data: {
      label: "Dietary Adjustments",
      category: NodeCategory.lifestyle,
      description: {
        generic:
          "A balanced diet rich in calcium, vitamin D, and omega-3 fatty acids supports bone health, cardiovascular function, and mood stability.Some evidence supports plant-based diets for symptom management, and Prebiotics to maintain a healthy gut microbiome.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "11c",
    type: "network",
    data: {
      label: "Mindfulness Techniques",
      category: NodeCategory.lifestyle,
      description: {
        generic:
          "Practicing meditation, self-awareness, relaxation techniques (paced breathing) for stress reduction can help with developing coping mechanisms for symptom management.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "11d",
    type: "network",
    data: {
      label: "Smoking and Alcohol Reduction",
      category: NodeCategory.lifestyle,
      description: {
        generic:
          "Reducing or quitting smoking and limiting alcohol intake can improve overall health and may reduce the severity of hot flashes and mood fluctuations.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "11e",
    type: "network",
    data: {
      label: "Sleep Hygiene",
      category: NodeCategory.lifestyle,
      description: {
        generic:
          "Refers to establishing a regular bedtime routine, creating a calm sleep environment, and limiting screen time before bed can improve insomnia and night sweats.This can be essential for mood stabilization​ as well as cognitive function​ enhancement.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
]

const supplementalNodes: NetworkNodeType[] = [
  {
    id: "12a",
    type: "network",
    data: {
      label: "Vitamins and Minerals",
      category: NodeCategory.supplemental,
      description: {
        generic:
          "Supplements that support overall health and target specific menopause-related concerns.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "12b",
    type: "network",
    data: {
      label: "Phytoestrogens",
      category: NodeCategory.supplemental,
      description: {
        generic: "Plant-derived compounds that mimic estrogen in the body.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "12c",
    type: "network",
    data: {
      label: "Herbal Remedies",
      category: NodeCategory.supplemental,
      description: {
        generic: "Botanicals traditionally used for menopause symptom relief.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "12d",
    type: "network",
    data: {
      label: "Other / Combination Supplements",
      category: NodeCategory.supplemental,
      description: {
        generic:
          "Formulations that blend multiple ingredients, often combining phytoestrogens, herbs, and vitamins to address a broader range of symptoms.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
]

const mentalHealthNodes: NetworkNodeType[] = [
  {
    id: "13a",
    type: "network",
    data: {
      label: "Anxiety",
      category: NodeCategory.mentalHealth,
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "13b",
    type: "network",
    data: {
      label: "Depression",
      category: NodeCategory.mentalHealth,
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "13c",
    type: "network",
    data: {
      label: "Irritability",
      category: NodeCategory.mentalHealth,
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "13d",
    type: "network",
    data: {
      label: "Moodiness",
      category: NodeCategory.mentalHealth,
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "13e",
    type: "network",
    data: {
      label: "Brain Fog",
      category: NodeCategory.mentalHealth,
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
]

const vasomotorNodes: NetworkNodeType[] = [
  {
    id: "14a",
    type: "network",
    data: {
      label: "Hot Flashes",
      category: NodeCategory.vasomotor,
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "14b",
    type: "network",
    data: {
      label: "Sweating",
      category: NodeCategory.vasomotor,
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "14c",
    type: "network",
    data: {
      label: "Blood Pressure (Hypertension)",
      category: NodeCategory.vasomotor,
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "14d",
    type: "network",
    data: {
      label: "Tachycardia",
      category: NodeCategory.vasomotor,
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
]

const genitourinaryNodes: NetworkNodeType[] = [
  {
    id: "15a",
    type: "network",
    data: {
      label: "Genital Issues",
      category: NodeCategory.genitourinary,
      description: {
        generic:
          "Genital issues during menopause include symptoms like vaginal dryness, itching, burning, and irritation. These occur due to declining estrogen levels, which affect the vaginal tissues, leading to thinning, reduced lubrication, and decreased elasticity.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "15b",
    type: "network",
    data: {
      label: "Urinary Issues",
      category: NodeCategory.genitourinary,
      description: {
        generic:
          "Urinary Issues include symptoms like urinary urgency, incontinence, and increased risk of UTIs. These issues arise due to the decline in estrogen levels, which can lead to weakening of the pelvic floor muscles, thinning of the urethral tissue, and changes in bladder function.",
      },
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
]

export const allNodes: NetworkNodeType[] = [
  ...initialNodes,
  ...treatmentNodes,
  ...pharmacologicalNodes,
  ...HRTMHTNodes,
  ...symptomNodes,
  ...alternativeTreatmentNodes,
  ...otherNovelHormonalNodes,
  ...nonHormonalNodes,
  ...therapyNodes,
  ...cbtNodes,
  ...lifestyleNodes,
  ...supplementalNodes,
  ...mentalHealthNodes,
  ...vasomotorNodes,
  ...genitourinaryNodes,
]
