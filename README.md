# Sacred Study Space

Build a modern interactive Catholic learning website based on the uploaded catechism file.

The website is for learners reviewing Catholic marriage catechism lessons and core Catholic prayers. It should feel reverent, peaceful, premium, and modern — a “Sacred Minimalism” aesthetic.

MAIN DESIGN VIBE

Use a Catholic but modern visual identity:

- Warm ivory / parchment background

- Deep burgundy and midnight navy as primary colors

- Muted gold accents

- Elegant serif font for headings

- Clean sans-serif font for body text

- Subtle Catholic motifs: thin cross icon, soft halo circles, chapel arch shapes, prayer-card inspired panels

- Avoid old-fashioned church website design, heavy decorations, harsh colors, or childish visuals

- The UI should feel like a premium learning app, not a PDF viewer

CONTENT STRUCTURE

Use the uploaded file as the source content. Organize it into the following modules:

1. Lesson Takeaways

2. Revision Quiz

3. Fill-in-the-Blank Practice

The uploaded file includes:

- Lesson groups such as B123, B456, B78910, B111213

- Lessons from Bài 1 to Bài 13 about Catholic marriage, Catholic marriage law, mixed marriage, engagement, marital love, conflict resolution, separation, and family as domestic church

- Multiple-choice revision questions after each group

- Catholic prayers, including Kinh Tin, Kinh Cậy, Kinh Mến, Kinh Ăn Năn Tội, Kinh Lạy Cha, Kinh Kính Mừng, Kinh Sáng Danh, Kinh Sáng Soi, and Kinh Mười Điều Răn

APP GOAL

Turn this file into an interactive study website where users can:

- Read concise key takeaways from each lesson

- Practice multiple-choice quizzes

- Do fill-in-the-blank exercises using clauses from prayers and important catechism sentences

- Track what they have completed

- Review wrong answers

SITE STRUCTURE

1. Landing Page

Create a beautiful landing page with:

- Hero title: “Học Giáo Lý Hôn Nhân”

- Subtitle: “Ôn tập giáo lý Công giáo qua bài học ngắn, trắc nghiệm và luyện nhớ kinh.”

- Three feature cards:

  1. “Ý chính bài học”

  2. “Trắc nghiệm ôn tập”

  3. “Điền khuyết lời kinh”

- CTA button: “Bắt đầu học”

- A calm background with subtle arch/halo shapes

2. Dashboard

Create a dashboard showing:

- Lesson groups: Bài 1–3, Bài 4–6, Bài 7–10, Bài 11–13, Kinh căn bản

- Progress cards for each group

- Completion percentage

- Quick buttons: “Học ý chính”, “Làm quiz”, “Luyện điền khuyết”

3. Lesson Takeaways Page

For each lesson:

- Show the lesson title

- Show 4–6 concise key takeaways

- Use cards with icons

- Add a “Remember this” box summarizing the core idea in one sentence

- Add “Next lesson” and “Start quiz” buttons

Example lesson card format:

- Title: “Bài 1: Ơn gọi hôn nhân trong chương trình của Thiên Chúa”

- Sections:

  - Nguồn gốc

  - Định nghĩa

  - Yếu tố căn bản

  - Hai mục đích của hôn nhân

- End with one short summary sentence

4. Revision Quiz Page

Create an interactive multiple-choice quiz system:

- Questions grouped by lesson group

- One question shown at a time

- Four answer options: A, B, C, D

- After the user chooses an answer, show immediate feedback:

  - Correct: gentle success state

  - Incorrect: show the correct answer and a short explanation

- Add score tracking

- Add final result screen:

  - Score

  - Percentage

  - Encouraging Catholic-themed message

  - Button to retry wrong questions

- Keep the tone warm and supportive, not exam-pressure heavy

5. Fill-in-the-Blank Page

Create fill-in-the-blank exercises using important clauses from Catholic prayers and catechism sentences.

Two modes:

A. Prayer Mode

Use prayers from the file:

- Kinh Tin

- Kinh Cậy

- Kinh Mến

- Kinh Ăn Năn Tội

- Kinh Lạy Cha

- Kinh Kính Mừng

- Kinh Sáng Danh

- Kinh Sáng Soi

- Kinh Mười Điều Răn

Hide key words or short phrases and let users type the missing words.

Example:

“Lạy Cha chúng con ở trên trời, chúng con nguyện ______ Cha cả sáng.”

B. Catechism Mode

Use key doctrinal sentences from the lessons.

Example:

“Hôn nhân là một ______ ký kết giữa một người nam và một người nữ.”

Fill-in-the-blank requirements:

- Accept typed answers

- Ignore extra spaces and capitalization

- Give instant feedback

- Show hint button

- Show full sentence after submission

- Track correct/incorrect answers

- Allow retry

6. Review Mistakes Page

Create a simple review page where users can revisit:

- Quiz questions answered incorrectly

- Fill-in-the-blank items answered incorrectly

- The correct answer

- Related lesson or prayer

INTERACTION DESIGN

Use smooth, calm animations:

- Soft fade-ins

- Gentle card hover effects

- Progress rings or progress bars

- No aggressive gamification

- Keep everything peaceful and focused

COMPONENTS TO INCLUDE

- Top navigation bar

- Mobile bottom navigation

- Lesson cards

- Quiz cards

- Fill-in-the-blank input cards

- Progress tracker

- Result modal

- Review wrong answers section

- Search/filter for lessons and prayers

- Dark mode optional, but default should be warm light mode

DATA HANDLING

Create a clean data structure inside the app:

- lessons[]

- lessonGroups[]

- quizQuestions[]

- fillBlankItems[]

- prayers[]

Each quiz question should include:

- id

- groupId

- question

- options

- correctAnswer

- explanation

- relatedLesson

Each fill-in-the-blank item should include:

- id

- type: “prayer” or “catechism”

- sourceTitle

- fullSentence

- blankedSentence

- answer

- hint

- difficulty

IMPORTANT CONTENT RULES

- Do not invent Catholic doctrine beyond the uploaded file.

- Keep the wording faithful to the file.

- Clean up obvious formatting issues from the source file.

- Preserve Vietnamese Catholic terms accurately.

- Make the content easy to study, but do not oversimplify doctrine incorrectly.

- Use Vietnamese as the main language of the website.

RESPONSIVE DESIGN

The website must work beautifully on:

- Mobile phones

- Tablets

- Desktop

Mobile experience is especially important. Use large tap targets, readable text, and clean spacing.

FINAL OUTPUT

Generate a polished, production-ready React website with:

- Beautiful Catholic modern aesthetic

- Fully interactive lesson, quiz, and fill-in-the-blank experience

- Seed content from the uploaded file

- Clean component structure

- No placeholder lorem ipsum

- No broken buttons

- No fake features that do not work

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://catechism-cornerstone.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e6537138-8ded-4ecd-a065-c2d0c52da3ea).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
