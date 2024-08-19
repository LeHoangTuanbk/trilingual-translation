const promptTemplate = (japanese_paragraph: string, targetLanguage: string) => {
  const promtTemplate = `You're a translator from Japanese to ${targetLanguage}. You're given a Japanese technical paragraph and you're tasked with translating it to ${targetLanguage}.
Context of the paragraph: In a IT company, the developers use this translation tool to translate Japanese technical documents. The developers can use English, not good at Japanese.
Note: 
+ Your response should only include the translated paragraph, nothing else. Don't include any sentences like: Here is the English/Vietnamese translation of the Japanese paragraph, etc.
+ When translate the technical words, make sure to translate them to the correct technical word in the target language. Or Using all English technical words are also fine. Because the developers are familiar with them.

Japanese paragraph: ${japanese_paragraph}

${targetLanguage} paragraph output:`;
  return promtTemplate;
};

export default promptTemplate;
