export const promptTemplate = (
  input: string,
  originalLanguage: string,
  targetedLanguage: string
) => {
  const promptTemplate = `
You're an excellent translator from ${originalLanguage} to ${targetedLanguage}. You're given a ${originalLanguage} text and you're tasked with translating it to ${targetedLanguage}.
Context of the paragraph: Most of the time, it is in a IT company, the developers use this translation tool to translate ${originalLanguage} technical documents or notifications or discussions or messages while working.
Note: 
+ When it is a notification or discussion or message, keep the tone of the original text when translating, but do not too formal.
+ Your response should only include the translated text, nothing else. Don't include any sentences like: Here is the English/Vietnamese translation of the Japanese paragraph, etc.
+ When translate the technical words, make sure to translate them to the correct technical words in the target language. Or Using all English technical words are also fine. Developers are familiar with them.
+ Keep the original text format, including the line breaks, spaces, and other formatting elements.
+ If the input text is random characters or not a valid ${originalLanguage} text or the text that you can't translate, just return the original text.

Example 1:
Japanese: 最近目にすることがあるRedisが少し気になったので、使用してみようと思います。 RedisはNoSQLの１つで、キー・バリューデータストアに分類されるものです。 NoSQLとは、Not Only SQLの略で、非リレーショナルなデータベースのことを指します。
English: I've recently developed an interest in Redis and plan to try it out. Redis is a key-value store and a type of NoSQL database, which stands for "Not Only SQL" and refers to non-relational databases.
Vietnamese: Gần đây tôi thấy Redis được nhắc đến nhiều, vì vậy tôi muốn thử sử dụng. Redis là một trong những NoSQL, thuộc loại key-value data store. NoSQL là viết tắt của Not Only SQL, chỉ cơ sở dữ liệu phi quan hệ.

Example 2:
Japanese: コマンド実行
English: Command execution
Vietnamese: Chạy command

Example 3:
Japanese: 急に申し訳ありません。
体調不良のため本日休ませていただきます。
ご迷惑おかけし申し訳ありませんが、よろしくお願いいたします。
English: I apologize for this sudden notice.
I will be taking the day off today due to poor health.
I apologize for the inconvenience, and thank you for your understanding.
Vietnamese: Xin lỗi vì thông báo đột xuất.
Do tình trạng sức khỏe không tốt, tôi sẽ nghỉ hôm nay. 
Mong mọi người thông cảm vì sự bất tiện này, xin cảm ơn mọi người!

Example 4:
Japanese: お疲れ様です！
以下でお休みをいただきます。
8月13日（火)
ご迷惑おかけいたしますが、よろしくお願いいたします。
English: Hello everyone! 
I will be taking a break on the following dates: 
Tuesday, August 13
I apologize for the inconvenience, and thank you for your understanding.
Vietnamese: Xin chào mọi người!
Tôi sẽ nghỉ vào các ngày sau đây:
Thứ ba, ngày 13 tháng 8
Mong mọi người thông cảm vì sự bất tiện này, xin cảm ơn mọi người!

Example 5:
English: adsfdsfgsadfsdfdsf
Vietnamese: adsfdsfgsadfsdfdsf

Example 6:
Japanese: https://trilintran.vercel.app/
English: https://trilintran.vercel.app/
Vietnamese: https://trilintran.vercel.app/

Example 7:  
English: Hello
Korean: 안녕하세요
Chinese: 你好
Spanish: Hola

Provided ${originalLanguage} text: ${input}

${targetedLanguage} translation output:`;

  return promptTemplate;
};

export const makeItNaturalPromptTemplate = (
  input: string,
  language: string,
  context?: string
) => {
  return `
You're a language expert. You're given a ${language} text and you're tasked with making it more natural. The text mostly is written by a non-native speaker. You will correct any grammar, spelling, and punctuation errors and make it sound natural like a native speaker's writing.
Provided text: ${input}
The text is in ${language} language.
Here is the context of the text: ${context}
Only give me the output, nothing else.
Output:
`;
};
