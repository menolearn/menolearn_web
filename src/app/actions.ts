"use server"

import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export default async function submitToOpenAI(_prev: any, formData: FormData) {
  console.log("action called")
  const prompt = formData.get("prompt")?.toString() || ""

  if (!prompt) return null

  // return sample object
  return [
    {
      type: "output_text",
      annotations: [
        {
          type: "file_citation",
          file_id: "file-X22e97tvu7vygDzVivgL1W",
          filename:
            "Hill 2016 Hormone Therapy and Other Treatments for Symptoms of Menopause.pdf",
          index: 493,
        },
        {
          type: "file_citation",
          file_id: "file-X22e97tvu7vygDzVivgL1W",
          filename:
            "Hill 2016 Hormone Therapy and Other Treatments for Symptoms of Menopause.pdf",
          index: 493,
        },
        {
          type: "file_citation",
          file_id: "file-X22e97tvu7vygDzVivgL1W",
          filename:
            "Hill 2016 Hormone Therapy and Other Treatments for Symptoms of Menopause.pdf",
          index: 615,
        },
        {
          type: "file_citation",
          file_id: "file-SNHKjGiykVdtmSdUNCsv7W",
          filename: "JMM The 2020 Menopausal Hormone Therapy Guidelines.pdf",
          index: 615,
        },
        {
          type: "file_citation",
          file_id: "file-X22e97tvu7vygDzVivgL1W",
          filename:
            "Hill 2016 Hormone Therapy and Other Treatments for Symptoms of Menopause.pdf",
          index: 682,
        },
        {
          type: "file_citation",
          file_id: "file-UAaY1TmxfNhPanc7DJKXsn",
          filename:
            "Flores 2021 Hormone Therapy in Menopause- Concepts, Controversies, and Approach to Treatment.pdf",
          index: 1337,
        },
        {
          type: "file_citation",
          file_id: "file-UAaY1TmxfNhPanc7DJKXsn",
          filename:
            "Flores 2021 Hormone Therapy in Menopause- Concepts, Controversies, and Approach to Treatment.pdf",
          index: 1337,
        },
        {
          type: "file_citation",
          file_id: "file-UAaY1TmxfNhPanc7DJKXsn",
          filename:
            "Flores 2021 Hormone Therapy in Menopause- Concepts, Controversies, and Approach to Treatment.pdf",
          index: 1337,
        },
        {
          type: "file_citation",
          file_id: "file-X22e97tvu7vygDzVivgL1W",
          filename:
            "Hill 2016 Hormone Therapy and Other Treatments for Symptoms of Menopause.pdf",
          index: 1719,
        },
        {
          type: "file_citation",
          file_id: "file-X22e97tvu7vygDzVivgL1W",
          filename:
            "Hill 2016 Hormone Therapy and Other Treatments for Symptoms of Menopause.pdf",
          index: 1719,
        },
        {
          type: "file_citation",
          file_id: "file-X22e97tvu7vygDzVivgL1W",
          filename:
            "Hill 2016 Hormone Therapy and Other Treatments for Symptoms of Menopause.pdf",
          index: 1998,
        },
        {
          type: "file_citation",
          file_id: "file-UAaY1TmxfNhPanc7DJKXsn",
          filename:
            "Flores 2021 Hormone Therapy in Menopause- Concepts, Controversies, and Approach to Treatment.pdf",
          index: 1998,
        },
      ],
      text: "Treatment options for hot flashes (vasomotor symptoms) include hormonal, nonhormonal, and alternative therapies. Here is an evidence-based summary:\n\n**1. Hormone Therapy (HT):**\n- Systemic estrogen therapy (either alone or combined with progestogen for those with a uterus) is the most effective treatment for menopausal hot flashes. It's recommended to use the lowest effective dose for the shortest necessary duration due to risks such as breast cancer and thromboembolism with prolonged use.\n- For those who can't tolerate progestogens, a combination of conjugated estrogen and bazedoxifene (Duavee) is available.\n- Transdermal (patch, gel, spray) and oral estrogen are available.\n\n**2. Nonhormonal Prescription Medications:**\n- Low-dose paroxetine (an SSRI) is the only FDA-approved nonhormonal treatment for hot flashes. Other antidepressants such as venlafaxine and desvenlafaxine (SNRIs) are effective alternatives, especially for women with contraindications to HT. Note: Paroxetine should be avoided in women taking tamoxifen for breast cancer due to drug interactions.\n- Other options include gabapentin and pregabalin (antiseizure medications), but these may have side effects like dizziness and drowsiness.\n- Oxybutynin and neurokinin 3 receptor antagonists are emerging nonhormonal options, though further studies are needed.\n\n**3. Alternative and Complementary Therapies:**\n- Evidence does not support the effectiveness of most alternative treatments (black cohosh, botanical products, omega-3 fatty acids, yoga, acupuncture, lifestyle changes).\n- Soy foods and red clover may offer modest benefit, but the quality of evidence is low.\n- Clinical hypnosis may significantly reduce hot flashes in some women.\n\n**4. Non-prescription/Over-the-Counter:**\n- No consistent evidence supports over-the-counter supplements (e.g., black cohosh, botanical products, omega-3) for hot flashes.\n- Vaginal moisturizers or lubricants may help if symptoms are mainly genitourinary (dryness, irritation).\n\n**Key Considerations:**\n- For women at increased risk of breast cancer, cardiovascular disease, or thromboembolism, nonhormonal therapies should be considered first.\n- Always assess the risks and benefits of hormonal therapy in the context of individual risk factors.\n- Use shared decision-making with your healthcare provider, considering symptom severity, personal preferences, and health history.\n\nIf you want more specific recommendations or details about dosage, let me know!",
    },
  ]

  const response = await client.responses.create({
    model: "gpt-4.1",
    tools: [
      {
        type: "file_search",
        vector_store_ids: [process.env.VECTOR_STORE_ID!],
        max_num_results: 20,
      },
    ],
    input: prompt,
  })
  const message = response.output.find((x) => x.type == "message")!

  return message.content
}
