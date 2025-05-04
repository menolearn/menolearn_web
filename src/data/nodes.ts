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

export const iconDict = {
  ["question"]: CircleHelp,
  ["quiz"]: FileQuestion,
  ["support"]: Handshake,
  ["relief"]: HandHeart,
  ["pharmacological"]: BriefcaseMedical,
  ["alternative"]: Leaf,
}

export const allNodes: NetworkNodeType[] = [
  {
    id: "1",
    type: "network",
    data: {
      label: "What Is Menopause?",
      category: NodeCategory.initial,
    },
    position: { x: 400, y: 100 },
    connectsTo: ["1a", "1b", "1c", "1d"],
  },
  {
    id: "1a",
    type: "network",
    data: {
      label: "Need Relief?",
      category: NodeCategory.initial,
      icon: iconDict["relief"],
    },
    position: { x: 100, y: 300 },
    connectsTo: ["2a", "2b"],
  },
  {
    id: "1b",
    type: "network",
    data: {
      label: "Need Support?",
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
  // Relief nodes
  {
    id: "2a",
    type: "network",
    data: {
      label: "Pharmacological",
      category: NodeCategory.relief,
      description:
        "This encompasses all treatments that involve drugs or medications, whether over-the-counter or prescription. ",
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
      description:
        "This encompasses all treatments that involve lifestyle changes, therapies, and herbal or supplemental remedies.",
      icon: iconDict["alternative"],
    },
    position: { x: 200, y: 400 },
    connectsTo: ["6a", "6b", "6c", "6d"],
  },
  // Pharmacological nodes
  {
    id: "3a",
    type: "network",
    data: {
      label: "HRT/MHT",
      category: NodeCategory.pharma,
      description:
        "Hormone-based treatments that use estrogen and/or progesterone to manage symptoms like hot flashes, bone loss, and vaginal dryness. They come in various forms, including oral tablets (e.g., combined oral contraceptives), transdermal patches, topical gels, creams, injections, and intrauterine devices.",
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
      description:
        "Alternative hormones, hormonal compounds or selective estrogen receptor modulators (SERMs) provide symptom relief with different safety profiles and targeted effects. Includes Tibolone (Livial), Testosterone, Tissue-Selective Estrogen Complexes (TSEC) like Duavee, and Ospemifene, offering symptom relief while minimizing risks associated with systemic estrogen use. These therapies come in various forms, including oral tablets, patches, and gels.",
    },
    position: { x: -500, y: 300 },
    connectsTo: [],
  },
  {
    id: "3c",
    type: "network",
    data: {
      label: "Non-Hormonal",
      category: NodeCategory.pharma,
      description:
        "Offer menopause symptom relief without estrogen or progesterone. This includes NK3 receptor antagonists like Fezolinetan and medications such as Clonidine, Gabapentin, and antidepressants (SSRIs, SNRIs like Effexor and Lexapro).",
    },
    position: { x: -700, y: 300 },
    connectsTo: [],
  },
  // HRT/MHT
  {
    id: "4a",
    type: "network",
    data: {
      label: "EPT",
      category: NodeCategory.hrt,
      description:
        "“EPT” refers to Estrogen-Progestin therapy. This is a type of combination hormone replacement therapy that combines estrogen and progestin, a synthetic form of progesterone, to treat menopausal symptoms in women who still have a uterus.",
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
      description:
        "'ET' stands for 'Estrogen Therapy,' which refers to the treatment that consists of only estrogen hormones to alleviate symptoms associated with menopause, typically prescribed for women who have had a hysterectomy.",
      icon: undefined,
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
      description:
        "Progesterone is recommended to be used in combination with Estrogen (EPT). LNG-IUS is a solely progestin-based intrauterine device. Unless used in combination with oral or percutaneous estrogen, progesterone-only therapy is typically prescribed to those with contraindications to estrogen.",
    },
    position: { x: 0, y: 500 },
    connectsTo: [],
  },
  // Support nodes
  {
    id: "5a",
    type: "network",
    data: {
      label: "Mental Health",
      category: NodeCategory.support,
    },
    position: { x: 300, y: 300 },
    connectsTo: [],
  },
  {
    id: "5b",
    type: "network",
    data: {
      label: "Vasomotor",
      category: NodeCategory.support,
    },
    position: { x: 500, y: 300 },
    connectsTo: [],
  },
  {
    id: "5c",
    type: "network",
    data: {
      label: "Genitourinary",
      category: NodeCategory.support,
    },
    position: { x: 400, y: 300 },
    connectsTo: [],
  },
  // Alt treatments
  {
    id: "6a",
    type: "network",
    data: {
      label: "Other Symptoms",
      category: NodeCategory.alternative,
    },
    position: { x: 0, y: 300 },
    connectsTo: [],
  },
  {
    id: "6b",
    type: "network",
    data: {
      label: "Therapy",
      category: NodeCategory.alternative,
    },
    position: { x: -200, y: 300 },
    connectsTo: [],
  },
  {
    id: "6c",
    type: "network",
    data: {
      label: "Lifestyle",
      category: NodeCategory.alternative,
    },
    position: { x: 200, y: 300 },
    connectsTo: [],
  },
  {
    id: "6d",
    type: "network",
    data: {
      label: "Supplemental",
      category: NodeCategory.alternative,
    },
    position: { x: 400, y: 300 },
    connectsTo: [],
  },
]
