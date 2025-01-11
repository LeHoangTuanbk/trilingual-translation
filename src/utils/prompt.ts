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

Example 8:
Japanese: 
2024年12月に『薬屋のひとりごと-猫猫の後宮謎解き手帳-』19巻が発売されました。
そちらに収録されている80話「事の始まり」について、ネームに苦戦した件を記事にしようと思いながらすっかり遅くなって勿体ぶったような感じになってしまって、いやそんな御大層なものではない…とちょっと公開が恥ずかしくなってきました。
でも自分のよう頑張った記録としても残しておきたい気持ち。
ちなみに書き始めたのは2024年8月でした。寝かしたなあ！！
English: 
In December 2024, volume 19 of "The Apothecary Diaries - Cat Cat's Ming Mansion Mystery Notebook" was released. 
As for the 80th episode "The Beginning of the Matter" included in it, I had intended to write an article about struggling with the name, but I kept delaying it, making it seem unnecessarily grandiose. I now feel a bit embarrassed to publish it. 
But I still want to keep it as a record of my efforts. 
By the way, I started writing it back in August 2024. I really let it sit for a while!
Vietnamese: 
Vào tháng 12 năm 2024, tập 19 của "Những câu chuyện của người bán thuốc - Nhật ký giải câu đố hậu cung của Mao Mao" đã được phát hành. 
Về câu chuyện thứ 80 có tựa đề "Sự khởi đầu của sự việc" được thu thập trong đó, tôi đã nghĩ đến việc viết bài về vấn đề gặp khó khăn khi thực hiện tên cho tác phẩm đó, nhưng đã trễ và cảm thấy như một điều tiếc nuối mặc dù thật sự không phải là cái gì lớn lao... nên tôi cảm thấy hơi ngại khi công khai. 
Dù vậy, tôi vẫn muốn giữ lại như một ký ức về sự cố gắng của bản thân. 
Nhân tiện, tôi đã bắt đầu viết từ tháng 8 năm 2024. Quả là một khoảng thời gian dài!

Example 9:
Japanese: 
■第一稿
第一稿では楼蘭の語りに合わせて絵のみの回想を入れるという形にして、47ページ使って昔語～楼蘭の最期まで描いていました。

しかし回想なしでひたすらセリフでのみ進むので読んでいて頭に入ってこないのと、時系列順に語っているわけではないのでいつの話をしているのか混乱してしまうかな…ということで、第二稿では思い切って子昌・神美の話を時系列順にがっつり漫画でやってみようということになりました。
English: 
■ First Draft  
In the first draft, I aligned with Rouran's narrative and included only illustrations for the flashback, using 47 pages to depict everything from ancient tales to Rouran's demise.

However, since it progresses solely through dialogue without any flashbacks, it becomes difficult to follow the story, and because it's not told in chronological order, it might be confusing as to when the events are taking place... Therefore, in the second draft, we boldly decided to depict the story of Koshou and Shinmi in chronological order through manga.
Vietnamese: 
■Bản thảo đầu tiên
Trong bản thảo đầu tiên, tôi đã làm theo lời kể của Loulan với hình thức chỉ đưa vào hình ảnh hồi tưởng và sử dụng 47 trang để miêu tả từ những câu chuyện cổ đến cái kết của Loulan.

Tuy nhiên, việc để câu chuyện tiến triển chỉ bằng lời thoại mà không có hồi tưởng khiến người đọc không nắm bắt được nội dung, và vì không kể theo trình tự thời gian nên có thể sẽ gây nhầm lẫn về thời điểm của câu chuyện... Do đó, ở bản thảo thứ hai, tôi đã quyết định thử miêu tả triệt để câu chuyện của Tử Xương và Thần Mỹ theo trình tự thời gian thông qua truyện tranh.

1. Provided ${originalLanguage} text: 
${input}

2. ${targetedLanguage} translation output:`;

  return promptTemplate;
};

export const makeItNaturalPromptTemplate = (
  input: string,
  language: string,
  context?: string
) => {
  return `
You're a language expert. You're given a ${language} text and you're tasked with making it more natural. The text mostly is written by a non-native speaker. You will correct any grammar, spelling, and punctuation errors and make it sound natural like a native speaker's writing. Please keep the original text format, including the line breaks, spaces, and other formatting elements.

Here are some examples:
Example 1:
Provided text: Send me the report when you finish.
Context: business context
Output: Please send me the report once it’s complete.”
Example 2:
Provided text: I want to know about the meeting details..
Context: business context
Output: Could you please provide the meeting details?
Example 3: 
Provided text: This paper says that global warming is bad..
Context: Academic Context
Output: This paper argues that global warming has significant negative impacts.
Example 4:
Provided text: The experiment was done to see the results.
Context: Academic Context
Output: The experiment was conducted to analyze the results.
Example 5:
Provided text: We found that the hypothesis was true.
Context: Academic Context
Output: The results supported the hypothesis.
Example 6:
Provided text: 
Dear Mr. Smith,

Thank you for your email.

I will review the document 
and get back to you soon.


Best regards,
Jane Doe
Context: Business Context
Output: 
Dear Mr. Smith,

Thank you for your email. I will review the document and get back to you soon.

Best regards,  
Jane Doe



1. The text is in ${language} language.
2. Provided text: 
${input}
3. Here is the context of the text: ${context}

4. Only give me the output, nothing else.
Your output:
`;
};
