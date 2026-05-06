// Catechism content — sourced faithfully from the uploaded Giao_ly.rtf

export type LessonGroupId = "B123" | "B456" | "B78910" | "B111213" | "Kinh";

export interface LessonSection {
  title: string;
  body: string;
}

export interface Lesson {
  id: string; // "bai-1"
  groupId: LessonGroupId;
  number: number;
  title: string;
  sections: LessonSection[];
  remember: string;
}

export interface LessonGroup {
  id: LessonGroupId;
  label: string;
  range: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  groupId: LessonGroupId;
  question: string;
  options: string[]; // 4 options
  correctAnswer: number; // 0..3
  explanation: string;
  relatedLesson?: string;
}

export interface FillBlankItem {
  id: string;
  type: "prayer" | "catechism";
  sourceTitle: string;
  fullSentence: string;
  blankedSentence: string; // uses ____ as the blank
  answer: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Prayer {
  id: string;
  title: string;
  body: string;
}

export const lessonGroups: LessonGroup[] = [
  { id: "B123", label: "Bài 1 – 3", range: "Bài 1–3", description: "Ơn gọi hôn nhân, Bí tích & Giáo luật" },
  { id: "B456", label: "Bài 4 – 6", range: "Bài 4–6", description: "Hôn nhân khác đạo, thủ tục & đính hôn" },
  { id: "B78910", label: "Bài 7 – 10", range: "Bài 7–10", description: "Tình yêu, tính dục, hòa hợp, triển nở" },
  { id: "B111213", label: "Bài 11 – 13", range: "Bài 11–13", description: "Xung đột, phân ly, Hội Thánh tại gia" },
  { id: "Kinh", label: "Kinh căn bản", range: "Kinh", description: "Các kinh quan trọng" },
];

export const lessons: Lesson[] = [
  {
    id: "bai-1",
    groupId: "B123",
    number: 1,
    title: "Ơn gọi hôn nhân trong chương trình của Thiên Chúa",
    sections: [
      { title: "Nguồn gốc", body: "Hôn nhân không phải là định chế thuần túy của con người mà do chính Thiên Chúa thiết lập ngay từ khi tạo dựng con người có nam có nữ theo hình ảnh Ngài." },
      { title: "Định nghĩa", body: "Hôn nhân là một giao ước ký kết giữa một người nam và một người nữ với sự tự do và trách nhiệm để yêu thương, giúp đỡ nhau và sinh sản, giáo dục con cái." },
      { title: "Yếu tố căn bản", body: "Tình yêu là nền móng, là sức mạnh và là mục đích cuối cùng của hôn nhân." },
      { title: "Hai mục đích", body: "1) Mưu cầu lợi ích/hạnh phúc của đôi vợ chồng. 2) Sinh sản và giáo dục con cái — cộng tác với Thiên Chúa truyền hành sự sống." },
    ],
    remember: "Hôn nhân là giao ước thánh do Thiên Chúa thiết lập, đặt nền trên tình yêu và mở ngỏ cho sự sống.",
  },
  {
    id: "bai-2",
    groupId: "B123",
    number: 2,
    title: "Hôn nhân Công giáo",
    sections: [
      { title: "Bí tích Hôn phối", body: "Đối với người Kitô hữu, hôn nhân là một Bí tích do Chúa Giêsu lập, nâng tầm khế ước tự nhiên thành dấu chỉ tình yêu giữa Đức Kitô và Hội Thánh." },
      { title: "Đơn nhất", body: "Một vợ một chồng, bình đẳng về phẩm giá; lên án đa thê." },
      { title: "Bất khả phân ly", body: "Trung thành yêu thương trọn đời; không quyền lực nào có thể tháo gỡ, ngoại trừ cái chết." },
      { title: "Ân sủng Bí tích", body: "Chúa Giêsu ở lại với đôi bạn, ban sức mạnh để họ yêu thương như Người yêu Hội Thánh và giáo dục con cái." },
    ],
    remember: "Hôn nhân Công giáo là Bí tích đơn nhất và bất khả phân ly, phản chiếu tình yêu Đức Kitô với Hội Thánh.",
  },
  {
    id: "bai-3",
    groupId: "B123",
    number: 3,
    title: "Giáo luật về Bí tích Hôn phối",
    sections: [
      { title: "Điều kiện thành sự", body: "Một nam một nữ đã rửa tội; có tự do (không bị ép buộc/ngăn trở); bày tỏ sự ưng thuận; cử hành theo thể thức Hội Thánh." },
      { title: "Ngăn trở hôn phối", body: "Có 12 ngăn trở (chưa đủ tuổi, bất lực, đang có dây hôn phối, khác tôn giáo, họ máu…). Một số có thể được miễn chuẩn; bất lực và họ máu hàng dọc thì không." },
      { title: "Sự ưng thuận", body: "Yếu tố cốt yếu 'làm nên hôn nhân' — phải tự nguyện, không bạo lực, đủ trí khôn để hiểu nghĩa vụ hôn nhân." },
      { title: "Thể thức", body: "Kết ước trước mặt vị chứng hôn có thẩm quyền (Linh mục/Phó tế) và hai người làm chứng." },
    ],
    remember: "Sự ưng thuận tự do của đôi nam nữ trước vị chứng hôn và hai chứng nhân là điều làm nên Bí tích.",
  },
  {
    id: "bai-4",
    groupId: "B456",
    number: 4,
    title: "Hôn nhân khác tôn giáo",
    sections: [
      { title: "Hỗn hợp (dị tín)", body: "Giữa một người Công giáo và một Kitô hữu hệ phái khác đã rửa tội (Tin Lành, Chính Thống)." },
      { title: "Khác đạo (dị giáo)", body: "Giữa một người Công giáo và người chưa rửa tội (Phật giáo, Hồi giáo, không tôn giáo)." },
      { title: "Điều kiện phép chuẩn", body: "Cả hai hiểu và chấp nhận mục đích, đặc tính hôn nhân Công giáo; bên Công giáo cam kết giữ đạo và rửa tội/giáo dục con cái trong Hội Thánh; cho bên kia biết rõ cam kết này." },
      { title: "Thách đố và sứ mạng", body: "Người Công giáo được mời gọi sống tốt để trở thành chứng nhân Tin Mừng, thánh hóa người bạn đời và chịu trách nhiệm về đức tin của con cái." },
    ],
    remember: "Hôn nhân khác tôn giáo cần phép chuẩn và lời cam kết giữ đạo, giáo dục con cái trong Hội Thánh.",
  },
  {
    id: "bai-5",
    groupId: "B456",
    number: 5,
    title: "Các thủ tục và nghi lễ Hôn phối",
    sections: [
      { title: "Thủ tục dân sự", body: "Đăng ký kết hôn tại Ủy ban Nhân dân cấp xã/phường." },
      { title: "Nghi lễ truyền thống", body: "Lễ dạm (chạm ngõ), Lễ đính hôn (ăn hỏi), Lễ cưới (Vu Quy nhà gái, Thành Hôn nhà trai)." },
      { title: "Chuẩn bị Giáo luật", body: "Gặp cha xứ làm tờ khai hôn phối, học giáo lý, kiểm tra ngăn trở; cần chứng nhận Rửa tội và Thêm sức." },
      { title: "Rao hôn phối", body: "Công bố 3 Chúa nhật liên tiếp tại giáo xứ hai bên để cộng đoàn cầu nguyện và phát hiện ngăn trở." },
      { title: "Nghi thức Bí tích", body: "Ba phần: Thẩm vấn — Trao đổi lời thề hứa (cốt yếu) — Làm phép, trao nhẫn cưới." },
    ],
    remember: "Thẩm vấn — trao lời thề hứa — làm phép, trao nhẫn: phần trao lời thề là cốt yếu của Bí tích.",
  },
  {
    id: "bai-6",
    groupId: "B456",
    number: 6,
    title: "Sống thời kỳ đính hôn",
    sections: [
      { title: "Các giai đoạn chuẩn bị", body: "Chuẩn bị xa (từ thơ ấu), chuẩn bị gần (học giáo lý, nhân bản), chuẩn bị liền trước (đào sâu mầu nhiệm đức tin)." },
      { title: "Ý nghĩa", body: "Giúp đôi bạn chín chắn hơn, có cơ hội tìm hiểu kỹ về nhau và gia đình hai bên trước quyết định cả đời." },
      { title: "Cách sống", body: "Gia tăng cầu nguyện, lắng nghe ý Chúa; thành thật trao đổi về kinh tế, con cái, lối sống; giữ gìn sự khiết tịnh." },
      { title: "Khiết tịnh", body: "Tập tự chủ, tôn trọng lẫn nhau; dành những hành động biểu lộ tình yêu vợ chồng cho sau ngày cưới." },
    ],
    remember: "Đính hôn là thời gian chuẩn bị tâm hồn — tìm hiểu thật, cầu nguyện và giữ khiết tịnh.",
  },
  {
    id: "bai-7",
    groupId: "B78910",
    number: 7,
    title: "Tình yêu vợ chồng",
    sections: [
      { title: "Đặc tính cốt lõi", body: "Cam kết quyết liệt, hướng tới kết hợp nên một; trao hiến trọn vẹn, chung thủy suốt đời và mở ngỏ cho sự sống." },
      { title: "Hai mục đích", body: "Lợi ích của chính đôi vợ chồng và việc lưu truyền sự sống — không thể tách rời." },
      { title: "Nhiệm vụ", body: "Vợ chồng bình đẳng phẩm giá; chồng là bạn đời, bạn đạo, là cha; vợ là bạn đời, là mẹ — cùng xây dựng hạnh phúc." },
    ],
    remember: "Tình yêu vợ chồng: trao hiến — chung thủy — mở ngỏ cho sự sống.",
  },
  {
    id: "bai-8",
    groupId: "B78910",
    number: 8,
    title: "Tính dục và hôn nhân",
    sections: [
      { title: "Khái niệm", body: "Phân biệt giới tính (đặc điểm nam/nữ), tính dục (khuynh hướng yêu thương) và tình dục (sự kết hợp vợ chồng)." },
      { title: "Giá trị", body: "Tính dục là ân huệ Chúa ban, là ngôn ngữ của tình yêu giúp vợ chồng thông hiệp và đem lại hoan lạc chính đáng." },
      { title: "Nguyên tắc luân lý", body: "Tránh các tội phạm khiết tịnh (dâm ô, thủ dâm, tà dâm…) và các tội xúc phạm phẩm giá hôn nhân (ngoại tình, ly dị, hôn nhân thử, sống chung không cưới)." },
      { title: "Khiết tịnh trong hôn nhân", body: "Là việc làm chủ giới tính để vợ chồng ăn ở với nhau cách tiết độ và tôn trọng nhau." },
    ],
    remember: "Tính dục là ngôn ngữ thánh thiêng của tình yêu — được sống với tiết độ và tôn trọng.",
  },
  {
    id: "bai-9",
    groupId: "B78910",
    number: 9,
    title: "Hòa hợp vợ chồng — Sự khác biệt nam nữ",
    sections: [
      { title: "Sự bổ túc", body: "Nam nữ khác biệt về thể xác, nhận thức, tâm lý, lòng đạo đức để bổ sung và nâng đỡ nhau." },
      { title: "Luật ưu tiên", body: "Nam ưu tiên thể xác, nữ ưu tiên trái tim." },
      { title: "Luật phân cách", body: "Trái tim nam có nhiều ngăn (vợ, việc, lý tưởng, giải trí); nữ chỉ một ngăn dành trọn cho chồng." },
      { title: "Luật chi tiết", body: "Nam quan tâm cái cốt yếu; nữ để ý các chi tiết nhỏ." },
      { title: "Luật bất đồng cảm", body: "Nam phản ứng nhanh nhưng mau dứt; nữ phản ứng chậm nhưng kéo dài." },
      { title: "Luật thính giác", body: "Nữ thích nghe lời ngọt ngào ('lỗ tai to'); nam ít nói hơn ('lưỡi ngắn')." },
    ],
    remember: "Hiểu khác biệt nam — nữ là chìa khóa để bổ túc, không để phân cách.",
  },
  {
    id: "bai-10",
    groupId: "B78910",
    number: 10,
    title: "Triển nở trong tình yêu",
    sections: [
      { title: "7 hành động", body: "Tôn trọng nhau, hy sinh cho nhau, đối thoại, dành thời giờ, nói lời âu yếm, làm tròn bổn phận vợ chồng và cầu nguyện cùng nhau." },
      { title: "Đối thoại & Hy sinh", body: "Đối thoại là biết nói và biết lắng nghe bằng con tim; hy sinh là bằng chứng của tình yêu chân thật, gồm cả tha thứ." },
      { title: "Sự hiện diện của Chúa", body: "Cầu nguyện giúp gia đình có Chúa ở cùng — Ngài là nút dây nối kết giúp vợ chồng vượt qua thử thách." },
    ],
    remember: "Tình yêu triển nở khi vợ chồng đối thoại, hy sinh và cùng nhau cầu nguyện.",
  },
  {
    id: "bai-11",
    groupId: "B111213",
    number: 11,
    title: "Hòa hợp vợ chồng — Giải quyết xung đột",
    sections: [
      { title: "Thực tế", body: "Xung đột khó tránh, ngay cả Gia đình Thánh Gia cũng có (lạc mất Chúa Giêsu, biến cố Đức Maria mang thai)." },
      { title: "Nguyên nhân", body: "Khác biệt tâm sinh lý, cá tính, quan điểm sống, giáo dục, tài chính, cách dạy con." },
      { title: "Ngăn ngừa", body: "Tìm hiểu kỹ trước hôn nhân; yêu thật sự thay vì coi hôn nhân là cuộc đổi chác." },
      { title: "7 nguyên tắc vàng", body: "Tự chủ, thiện chí, đối thoại, nhận lỗi, làm hòa ngay, nhờ trung gian (người uy tín, đức tin), cầu nguyện." },
    ],
    remember: "Mục đích tranh luận không phải để thắng — mà để cùng tìm ra điều tốt hơn và hợp nhất.",
  },
  {
    id: "bai-12",
    groupId: "B111213",
    number: 12,
    title: "Sự phân ly vợ chồng",
    sections: [
      { title: "Bất khả phân ly", body: "Hôn nhân 'trọn vẹn' (đã thành sự, là bí tích, đã ăn ở) thì không quyền lực nào tháo gỡ được, trừ cái chết." },
      { title: "Trường hợp đặc biệt", body: "Hội Thánh có thể tháo gỡ hôn nhân không trọn vẹn (chưa ăn ở, hoặc theo Đặc ân Thánh Phaolô)." },
      { title: "Ly thân", body: "Không còn chung sống nhưng vẫn là vợ chồng trước mặt Chúa; chỉ được phép khi có lý do nghiêm trọng và Giáo quyền chấp thuận." },
      { title: "Tái hôn sau ly dị", body: "Hội Thánh không công nhận; người tái hôn dân sự không rước lễ nhưng vẫn được mời gọi sống đạo và giáo dục con cái." },
    ],
    remember: "Hôn nhân trọn vẹn là vĩnh viễn; ly thân không cắt đứt dây hôn phối trước mặt Chúa.",
  },
  {
    id: "bai-13",
    groupId: "B111213",
    number: 13,
    title: "Gia đình là Hội Thánh tại gia",
    sections: [
      { title: "Định nghĩa", body: "Gia đình là 'Giáo hội thu nhỏ' — cha mẹ là người truyền dạy đức tin đầu tiên cho con bằng lời và gương sáng." },
      { title: "Mầu nhiệm Ba Ngôi", body: "Gia đình phản chiếu tình yêu hiệp thông của Chúa Ba Ngôi qua sự gắn kết cha — mẹ — con cái." },
      { title: "Ngôn sứ", body: "Đón nhận, tuyên xưng và loan báo Tin Mừng qua đời sống đức tin hằng ngày." },
      { title: "Tư tế", body: "Cầu nguyện, tham dự bí tích, thánh hóa đời sống qua hy sinh." },
      { title: "Mục tử (Vương đế)", body: "Phục vụ con người, bắt đầu từ việc vợ chồng phục vụ lẫn nhau và con cái theo gương Chúa Giêsu." },
    ],
    remember: "Gia đình loan báo Tin Mừng hiệu quả nhất bằng hạnh phúc và yêu thương thực sự.",
  },
];

export const quizQuestions: QuizQuestion[] = [
  // ===== B123 =====
  { id: "q-b123-1", groupId: "B123", question: "Ai là Đấng thiết lập và khắc ghi ơn gọi hôn nhân vào bản tính con người?",
    options: ["Xã hội loài người qua các thời đại.","Do con người tự thỏa thuận với nhau.","Chính Thiên Chúa từ khi tạo dựng.","Do luật pháp của mỗi quốc gia quy định."],
    correctAnswer: 2, explanation: "Hôn nhân do chính Thiên Chúa thiết lập từ khi tạo dựng con người có nam có nữ.", relatedLesson: "bai-1" },
  { id: "q-b123-2", groupId: "B123", question: "Hai mục đích không thể tách rời của hôn nhân là gì?",
    options: ["Làm giàu và nuôi dạy con cái thành đạt.","Hạnh phúc vợ chồng và duy trì nòi giống (sinh sản/giáo dục con cái).","Phục vụ xã hội và phục vụ dòng tộc.","Thỏa mãn nhu cầu cá nhân và tìm người bầu bạn."],
    correctAnswer: 1, explanation: "Hai mục đích: lợi ích/hạnh phúc đôi vợ chồng và sinh sản — giáo dục con cái.", relatedLesson: "bai-1" },
  { id: "q-b123-3", groupId: "B123", question: "Tại sao hôn nhân Công giáo lại có đặc tính 'Bất khả phân ly'?",
    options: ["Vì lý do kinh tế và tài sản chung.","Vì để bảo vệ danh dự của gia đình hai bên.","Vì rập khuôn theo sự trung tín của Thiên Chúa với dân Ngài và của Đức Kitô với Hội Thánh.","Vì luật pháp dân sự không cho phép ly dị."],
    correctAnswer: 2, explanation: "Bất khả phân ly phản chiếu sự trung tín của Đức Kitô với Hội Thánh.", relatedLesson: "bai-2" },
  { id: "q-b123-4", groupId: "B123", question: "Bí tích Hôn phối ban ơn giúp đôi bạn thực hiện điều gì?",
    options: ["Để họ không bao giờ gặp khó khăn hay đau khổ.","Giúp họ yêu nhau bằng tình yêu siêu nhiên, biết tha thứ và giúp nhau nên thánh.","Để họ có quyền lực hơn những người khác trong giáo xứ.","Để đảm bảo họ sẽ sinh được nhiều con cái theo ý muốn."],
    correctAnswer: 1, explanation: "Ân sủng Bí tích giúp đôi bạn yêu thương như Đức Kitô và nên thánh.", relatedLesson: "bai-2" },
  { id: "q-b123-5", groupId: "B123", question: "Ngăn trở nào sau đây Hội Thánh TUYỆT ĐỐI không thể miễn chuẩn?",
    options: ["Chưa đủ tuổi kết hôn.","Khác biệt tôn giáo.","Bất lực hoặc có họ máu theo hàng dọc.","Chức thánh (Linh mục, Phó tế)."],
    correctAnswer: 2, explanation: "Bất lực và họ máu hàng dọc là ngăn trở không thể miễn chuẩn.", relatedLesson: "bai-3" },
  { id: "q-b123-6", groupId: "B123", question: "Theo Giáo luật, 'Bất lực' khác với 'Vô sinh' như thế nào?",
    options: ["Bất lực là không thể giao hợp, vô sinh là không thể có con; chỉ bất lực mới là ngăn trở.","Vô sinh là ngăn trở tiêu hủy hôn phối, còn bất lực thì không.","Cả hai đều là ngăn trở làm hôn nhân không thành sự.","Giáo luật không phân biệt hai khái niệm này."],
    correctAnswer: 0, explanation: "Chỉ bất lực (không thể giao hợp) mới là ngăn trở làm hôn nhân không thành sự.", relatedLesson: "bai-3" },
  { id: "q-b123-7", groupId: "B123", question: "Yếu tố nào được coi là 'làm nên hôn nhân' mà không quyền lực nhân loại nào thay thế được?",
    options: ["Sự chuẩn bị tiệc cưới linh đình.","Sự ưng thuận tự do của đôi nam nữ.","Sự đồng ý của cha mẹ hai bên.","Việc ký tên vào sổ đăng ký kết hôn dân sự."],
    correctAnswer: 1, explanation: "Sự ưng thuận tự do của đôi nam nữ là yếu tố cốt yếu làm nên hôn nhân.", relatedLesson: "bai-3" },
  { id: "q-b123-8", groupId: "B123", question: "Thể thức cử hành hôn phối thành sự yêu cầu sự hiện diện của những ai?",
    options: ["Chỉ cần đôi nam nữ và cha mẹ họ.","Đôi phối ngẫu, vị chứng hôn có thẩm quyền (Linh mục/Phó tế) và ít nhất hai người làm chứng.","Toàn thể cộng đoàn giáo xứ và ca đoàn.","Chỉ cần vị Linh mục chứng giám là đủ."],
    correctAnswer: 1, explanation: "Phải có đôi phối ngẫu, vị chứng hôn có thẩm quyền và hai người làm chứng.", relatedLesson: "bai-3" },
  { id: "q-b123-9", groupId: "B123", question: "Trường hợp nào sau đây được coi là 'Thiếu sự tự do ưng thuận'?",
    options: ["Bị lừa dối trầm trọng về phẩm cách của người kia.","Kết hôn vì bị đe dọa bạo lực hoặc sợ hãi trầm trọng.","Không có đủ trí khôn để hiểu về hôn nhân.","Tất cả các phương án trên."],
    correctAnswer: 3, explanation: "Tất cả các trường hợp trên đều làm thiếu sự tự do ưng thuận.", relatedLesson: "bai-3" },
  { id: "q-b123-10", groupId: "B123", question: "Hôn nhân giữa hai người đã rửa tội được gọi là gì trong đời sống Kitô giáo?",
    options: ["Một hợp đồng dân sự đơn thuần.","Một Bí tích thực sự của Giao ước mới.","Một nghi lễ tôn giáo để giữ truyền thống.","Một sự kết hợp mang tính tạm thời."],
    correctAnswer: 1, explanation: "Là Bí tích thực sự của Giao ước mới do Chúa Giêsu lập.", relatedLesson: "bai-2" },

  // ===== B456 =====
  { id: "q-b456-1", groupId: "B456", question: "Hôn nhân giữa một người Công giáo và một người đã rửa tội trong Hội Thánh Tin Lành được gọi là gì?",
    options: ["Hôn nhân khác đạo (dị giáo).","Hôn nhân hỗn hợp (dị tín).","Hôn nhân cùng tôn giáo.","Hôn nhân không thành sự."],
    correctAnswer: 1, explanation: "Cả hai đã rửa tội nhưng khác hệ phái — gọi là hôn nhân hỗn hợp (dị tín).", relatedLesson: "bai-4" },
  { id: "q-b456-2", groupId: "B456", question: "Điều kiện nào sau đây là BẮT BUỘC để bên Công giáo được phép chuẩn kết hôn với người khác đạo?",
    options: ["Bên không Công giáo phải cam kết sẽ sớm gia nhập đạo.","Bên Công giáo phải cam kết giữ đức tin và bảo đảm con cái được rửa tội, giáo dục trong Hội Thánh.","Phải có sự đồng ý của cha mẹ hai bên bằng văn bản.","Phải tổ chức tiệc cưới tại nhà xứ."],
    correctAnswer: 1, explanation: "Bên Công giáo cam kết giữ đạo và giáo dục con cái trong Hội Thánh.", relatedLesson: "bai-4" },
  { id: "q-b456-3", groupId: "B456", question: "Theo Giáo luật, người Công giáo cần lãnh nhận Bí tích nào TRƯỚC KHI kết hôn nếu chưa có?",
    options: ["Xức dầu bệnh nhân.","Truyền chức thánh.","Thêm sức.","Không bắt buộc thêm bí tích nào."],
    correctAnswer: 2, explanation: "Buộc phải có Bí tích Thêm sức trước khi kết hôn.", relatedLesson: "bai-5" },
  { id: "q-b456-4", groupId: "B456", question: "Việc 'Rao hôn phối' nhằm mục đích chính là gì?",
    options: ["Để thông báo cho mọi người biết để đến dự tiệc.","Để cộng đoàn cầu nguyện và trình báo nếu biết có ngăn trở.","Để thu lệ phí cưới hỏi cho giáo xứ.","Để giới thiệu gia cảnh của đôi bạn cho cộng đoàn."],
    correctAnswer: 1, explanation: "Rao hôn phối để cộng đoàn cầu nguyện và phát hiện ngăn trở.", relatedLesson: "bai-5" },
  { id: "q-b456-5", groupId: "B456", question: "Phần nào được coi là 'cốt yếu' nhất của Bí tích Hôn phối?",
    options: ["Phần thẩm vấn của Linh mục.","Phần làm phép và trao nhẫn cưới.","Phần trao đổi lời thề hứa nhận nhau làm vợ chồng.","Phần ký tên vào sổ Hôn phối."],
    correctAnswer: 2, explanation: "Trao đổi lời thề hứa là phần cốt yếu của Bí tích.", relatedLesson: "bai-5" },
  { id: "q-b456-6", groupId: "B456", question: "Theo bài 5, lễ cưới được tổ chức tại nhà gái được gọi là gì?",
    options: ["Lễ Thành Hôn.","Lễ Vu Quy.","Lễ Dạm ngõ.","Lễ Đính hôn."],
    correctAnswer: 1, explanation: "Lễ tại nhà gái gọi là Vu Quy; tại nhà trai gọi là Thành Hôn.", relatedLesson: "bai-5" },
  { id: "q-b456-7", groupId: "B456", question: "Thời kỳ đính hôn là thời gian để đôi bạn thực hiện điều gì?",
    options: ["Sống chung như vợ chồng để thử mức độ hòa hợp.","Tìm hiểu kỹ về nhau, về gia đình hai bên và cùng nhau sửa đổi khuyết điểm.","Chỉ tập trung vào việc chuẩn bị nhà cửa và tiệc cưới.","Tuyệt đối không được gặp nhau cho đến ngày cưới."],
    correctAnswer: 1, explanation: "Đính hôn là thời gian tìm hiểu kỹ và cùng sửa đổi khuyết điểm.", relatedLesson: "bai-6" },
  { id: "q-b456-8", groupId: "B456", question: "'Chuẩn bị xa' cho hôn nhân được bắt đầu từ khi nào?",
    options: ["Khi bắt đầu đi học giáo lý hôn nhân.","Khi hai người chính thức yêu nhau.","Từ thời thơ ấu trong gia đình, qua việc hình thành nhân cách.","Sau khi đã làm lễ đính hôn."],
    correctAnswer: 2, explanation: "Chuẩn bị xa bắt đầu từ thơ ấu trong gia đình.", relatedLesson: "bai-6" },
  { id: "q-b456-9", groupId: "B456", question: "Món quà tuyệt vời nhất đôi bạn có thể dành cho nhau trong ngày cưới theo bài 6 là gì?",
    options: ["Một ngôi nhà đầy đủ tiện nghi.","Sự trong trắng (khiết tịnh) của thời kỳ đính hôn.","Những món quà đắt tiền trao cho nhau trước mặt quan khách.","Danh sách những người bạn giàu có."],
    correctAnswer: 1, explanation: "Khiết tịnh là món quà quý nhất của thời kỳ đính hôn.", relatedLesson: "bai-6" },
  { id: "q-b456-10", groupId: "B456", question: "Nếu gặp khó khăn do khác biệt niềm tin, người Công giáo nên có thái độ nào với bạn đời?",
    options: ["Ép buộc bạn đời phải theo đạo ngay lập tức.","Trân trọng, cầu nguyện cho họ và sống tốt đạo để làm chứng cho Chúa.","Bỏ mặc đức tin của mình để giữ hòa khí gia đình.","Thường xuyên tranh cãi về các giáo lý khác biệt."],
    correctAnswer: 1, explanation: "Sống tốt đạo và cầu nguyện cho bạn đời là chứng nhân Tin Mừng.", relatedLesson: "bai-4" },

  // ===== B78910 =====
  { id: "q-b78910-1", groupId: "B78910", question: "Theo Bài 7, hành vi ân ái vợ chồng mang hai giá trị nào không thể phân ly?",
    options: ["Thỏa mãn cá nhân và trách nhiệm gia đình.","Kết hợp và truyền sinh.","Kinh tế và địa vị xã hội.","Nghĩa vụ và quyền lợi."],
    correctAnswer: 1, explanation: "Hai giá trị không thể phân ly: kết hợp và truyền sinh.", relatedLesson: "bai-7" },
  { id: "q-b78910-2", groupId: "B78910", question: "'Sự khiết tịnh trong đời sống hôn nhân' được hiểu là gì?",
    options: ["Tuyệt đối không quan hệ xác thịt sau khi cưới.","Việc làm chủ giới tính để ăn ở với nhau cách tiết độ.","Chỉ quan hệ khi muốn có con.","Sống độc thân mặc dù đã kết hôn."],
    correctAnswer: 1, explanation: "Khiết tịnh hôn nhân là làm chủ giới tính, sống tiết độ và tôn trọng nhau.", relatedLesson: "bai-8" },
  { id: "q-b78910-3", groupId: "B78910", question: "Đâu là một tội xúc phạm đến phẩm giá hôn nhân theo Bài 8?",
    options: ["Cầu nguyện cho nhau.","Tự do sống chung như vợ chồng (không cưới xin).","Đi làm để nuôi sống gia đình.","Đối thoại về những bất đồng."],
    correctAnswer: 1, explanation: "Tự do sống chung không cưới xin là tội xúc phạm phẩm giá hôn nhân.", relatedLesson: "bai-8" },
  { id: "q-b78910-4", groupId: "B78910", question: "Theo 'Luật phân cách' trong Bài 9, trái tim người phụ nữ được ví như thế nào?",
    options: ["Có nhiều ngăn dành cho nhiều công việc khác nhau.","Chỉ có một ngăn duy nhất dành cho người chồng.","Luôn thay đổi và không ổn định.","Chỉ quan tâm đến tiền bạc và con cái."],
    correctAnswer: 1, explanation: "Trái tim nữ chỉ có một ngăn dành trọn cho chồng.", relatedLesson: "bai-9" },
  { id: "q-b78910-5", groupId: "B78910", question: "Trong Bài 9, người nam thường có xu hướng nhận thức như thế nào?",
    options: ["Chú ý đến mọi chi tiết nhỏ nhặt.","Suy nghĩ bằng trực giác và tình cảm.","Chú ý đến cái tổng quát, cốt yếu và phán đoán khách quan hơn.","Luôn quan tâm đến những kỷ niệm ngày cưới."],
    correctAnswer: 2, explanation: "Nam có xu hướng quan tâm cái cốt yếu, phán đoán khách quan.", relatedLesson: "bai-9" },
  { id: "q-b78910-6", groupId: "B78910", question: "Để giải quyết mâu thuẫn, 'hy sinh' trong đời sống vợ chồng có nghĩa là gì?",
    options: ["Luôn chấp nhận làm điều xấu để vừa lòng đối phương.","'Một nhịn chín lành' và sẵn lòng tha thứ cho nhau.","Phải chịu đựng mọi sự bạo hành mà không được lên tiếng.","Bỏ mặc mọi trách nhiệm cá nhân."],
    correctAnswer: 1, explanation: "Hy sinh là 'một nhịn chín lành' và sẵn lòng tha thứ.", relatedLesson: "bai-10" },
  { id: "q-b78910-7", groupId: "B78910", question: "Yếu tố nào giúp vợ chồng hiểu nhau hơn và giảm bớt những bất đồng trong Bài 10?",
    options: ["Sự im lặng kéo dài.","Việc kiểm soát tài chính tuyệt đối.","Đối thoại chân thành (biết nói và biết nghe).","Nhờ người ngoài quyết định thay."],
    correctAnswer: 2, explanation: "Đối thoại chân thành — biết nói và biết nghe — là chìa khóa.", relatedLesson: "bai-10" },
  { id: "q-b78910-8", groupId: "B78910", question: "Tại sao việc cầu nguyện chung lại quan trọng đối với sự triển nở của tình yêu?",
    options: ["Để Chúa làm thay mọi việc cho vợ chồng.","Vì nơi nào có hai ba người họp lại nhân danh Chúa thì có Ngài ở giữa.","Để chứng tỏ với mọi người mình là gia đình đạo đức.","Để xin Chúa cho mình giàu có nhanh chóng."],
    correctAnswer: 1, explanation: "Nơi có hai ba người nhân danh Chúa thì có Ngài kết nối và nâng đỡ.", relatedLesson: "bai-10" },
  { id: "q-b78910-9", groupId: "B78910", question: "Theo Bài 10, vợ chồng cần đối xử với nhau như thế nào để thể hiện sự tôn trọng?",
    options: ["Coi vợ là người hầu của chồng.","Chỉ tôn trọng khi người kia mạnh khỏe và thành công.","Nhìn nhận nhau là bạn đời, bạn đạo và bình đẳng về phẩm giá.","Nói xấu nhau với người thứ ba khi giận dỗi."],
    correctAnswer: 2, explanation: "Bạn đời, bạn đạo, bình đẳng phẩm giá.", relatedLesson: "bai-10" },
  { id: "q-b78910-10", groupId: "B78910", question: "Đặc tính 'Chung thủy' trong hôn nhân có ý nghĩa gì?",
    options: ["Chỉ yêu nhau khi cảm thấy còn hứng thú.","Là sự gắn bó dứt khoát, không tạm bợ vì họ đã trở thành một thân thể duy nhất.","Có thể thay đổi nếu người kia phạm lỗi.","Chỉ cần trung thành về mặt thể xác, không cần về tâm hồn."],
    correctAnswer: 1, explanation: "Chung thủy là gắn bó dứt khoát — vợ chồng đã nên một thân thể.", relatedLesson: "bai-7" },

  // ===== B111213 =====
  { id: "q-b111213-1", groupId: "B111213", question: "Theo bài 11, mục đích của việc vợ chồng tranh cãi nên là gì?",
    options: ["Để phân định ai đúng ai sai rõ ràng.","Để ăn thua và hạ nhục đối phương cho bõ tức.","Nhằm tìm ra điều tốt hơn để đi đến chỗ hợp nhất.","Để giải tỏa áp lực cá nhân."],
    correctAnswer: 2, explanation: "Tranh luận để cùng tìm điều tốt hơn và đi đến hợp nhất.", relatedLesson: "bai-11" },
  { id: "q-b111213-2", groupId: "B111213", question: "Điều kiện nào cấu thành một cuộc 'Hôn nhân trọn vẹn'?",
    options: ["Có đăng ký kết hôn và đã tổ chức tiệc cưới.","Đã thành sự, là bí tích và đã ăn ở với nhau.","Được sự đồng ý của cha mẹ và đã có con cái.","Cả hai đều là người Công giáo và có việc làm ổn định."],
    correctAnswer: 1, explanation: "Trọn vẹn = đã thành sự + là bí tích + đã ăn ở với nhau.", relatedLesson: "bai-12" },
  { id: "q-b111213-3", groupId: "B111213", question: "'Đặc ân Thánh Phaolô' áp dụng cho trường hợp nào?",
    options: ["Hôn nhân giữa hai người Công giáo nhưng chưa có con.","Hôn nhân giữa một người Công giáo và một người ngoại đạo.","Hôn nhân giữa hai người chưa rửa tội, sau đó một người theo đạo và người kia không muốn chung sống hòa bình.","Hôn nhân đã ly dị tại tòa án dân sự."],
    correctAnswer: 2, explanation: "Đặc ân Thánh Phaolô áp dụng cho hai người chưa rửa tội, sau đó một người theo đạo.", relatedLesson: "bai-12" },
  { id: "q-b111213-4", groupId: "B111213", question: "Khi xảy ra xung đột nghiêm trọng, Hội Thánh cho phép 'Ly thân' nhằm mục đích gì?",
    options: ["Để hai người tự do tìm hiểu và kết hôn với người mới.","Để bảo vệ tinh thần, thể xác hoặc đức tin cho bên bị hại và con cái, nhưng vẫn giữ dây ràng buộc hôn nhân.","Để chấm dứt vĩnh viễn mối quan hệ vợ chồng trước mặt Chúa.","Để chia tài sản một cách công bằng theo luật đời."],
    correctAnswer: 1, explanation: "Ly thân bảo vệ bên bị hại nhưng vẫn giữ dây hôn phối.", relatedLesson: "bai-12" },
  { id: "q-b111213-5", groupId: "B111213", question: "Tại sao gia đình Kitô hữu được gọi là 'Hội Thánh tại gia'?",
    options: ["Vì gia đình có thể tự cử hành các bí tích mà không cần đến nhà thờ.","Vì gia đình tham dự vào sự sống và sứ mạng của Hội Thánh (Tư tế, Ngôn sứ, Mục tử).","Vì gia đình chỉ tập trung cầu nguyện cho các thành viên trong nhà.","Vì mỗi thành viên trong gia đình đều phải đi tu."],
    correctAnswer: 1, explanation: "Gia đình tham dự vào ba sứ mạng: Tư tế, Ngôn sứ, Mục tử.", relatedLesson: "bai-13" },
  { id: "q-b111213-6", groupId: "B111213", question: "Sứ mạng 'Mục tử' (Vương đế) trong gia đình được thể hiện rõ nhất qua hành động nào?",
    options: ["Người chồng quyết định mọi việc trong nhà theo ý mình.","Cả gia đình chỉ quan tâm đến việc kiếm tiền để làm từ thiện.","Sự phục vụ, hy sinh và chăm sóc lẫn nhau, đặc biệt với người nghèo khổ và yếu đuối.","Việc bắt con cái phải theo nghề nghiệp của cha mẹ."],
    correctAnswer: 2, explanation: "Mục tử là phục vụ, hy sinh, chăm sóc — đặc biệt với người yếu đuối.", relatedLesson: "bai-13" },
  { id: "q-b111213-7", groupId: "B111213", question: "Những người đã ly dị và tái hôn dân sự được Hội Thánh mời gọi làm gì?",
    options: ["Rời khỏi cộng đoàn vì đã phạm tội trọng.","Nghe Lời Chúa, tham dự Thánh lễ (dù không rước lễ), kiên trì cầu nguyện và giáo dục con cái.","Tự do rước lễ nếu cảm thấy mình không có lỗi.","Không cần tham gia các hoạt động bác ái của giáo xứ."],
    correctAnswer: 1, explanation: "Họ vẫn được mời gọi sống đạo, tham dự Thánh lễ và giáo dục con cái.", relatedLesson: "bai-12" },
  { id: "q-b111213-8", groupId: "B111213", question: "Theo bài 13, ai là những người đầu tiên có nhiệm vụ truyền dạy đức tin cho con cái?",
    options: ["Các Linh mục và Tu sĩ tại giáo xứ.","Giáo viên dạy giáo lý tại nhà thờ.","Ông bà và những người lớn tuổi trong họ hàng.","Cha mẹ, thông qua lời nói và chính gương sáng của mình."],
    correctAnswer: 3, explanation: "Cha mẹ là người truyền dạy đức tin đầu tiên qua lời và gương sáng.", relatedLesson: "bai-13" },
  { id: "q-b111213-9", groupId: "B111213", question: "Đâu là một phương cách giải quyết xung đột hiệu quả được nhắc tới trong bài 11?",
    options: ["Nhắc lại tất cả những chuyện cũ để đối phương thấy cái sai hệ thống.","Nhờ trung gian là những người có uy tín, đức tin và biết phân xử hợp tình hợp lý.","Giữ bầu không khí lạnh lùng thật lâu để đối phương tự hối lỗi.","Tuyệt đối tuân theo ý riêng của mình vì mình là chủ gia đình."],
    correctAnswer: 1, explanation: "Nhờ trung gian uy tín và đức tin là một trong 7 nguyên tắc vàng.", relatedLesson: "bai-11" },
  { id: "q-b111213-10", groupId: "B111213", question: "Việc cầu nguyện chung trong gia đình mang lại lợi ích gì?",
    options: ["Giúp vợ chồng bình tĩnh, dễ nhận ra ý Chúa và gắn kết với nhau hơn.","Thay thế hoàn toàn việc phải đối thoại trực tiếp.","Giúp gia đình trở nên giàu có nhanh chóng.","Chỉ để thực hiện nghĩa vụ đối với Giáo xứ."],
    correctAnswer: 0, explanation: "Cầu nguyện chung giúp vợ chồng bình tĩnh, nhận ý Chúa và gắn kết.", relatedLesson: "bai-13" },
  { id: "q-b111213-11", groupId: "B111213", question: "Đâu là phương cách quan trọng nhất để vợ chồng hiểu nhau và giảm bớt bất đồng?",
    options: ["Nhờ cha mẹ hai bên can thiệp.","Giữ im lặng để tránh cãi vã.","Đối thoại chân thành và lắng nghe nhau bằng trái tim.","Kiểm soát điện thoại và trang mạng xã hội của nhau."],
    correctAnswer: 2, explanation: "Đối thoại chân thành và lắng nghe bằng trái tim.", relatedLesson: "bai-10" },
  { id: "q-b111213-12", groupId: "B111213", question: "'Bài ca Đức Mến' của Thánh Phaolô dạy rằng tình yêu (Đức Mến) có đặc tính nào?",
    options: ["Tìm tư lợi và dễ nóng giận.","Ghen tương và tự đắc.","Nhẫn nhục, hiền hậu, tha thứ và chịu đựng tất cả.","Chỉ yêu thương khi người khác đối tốt với mình."],
    correctAnswer: 2, explanation: "Đức Mến nhẫn nhục, hiền hậu, tha thứ và chịu đựng tất cả.", relatedLesson: "bai-13" },
  { id: "q-b111213-13", groupId: "B111213", question: "Trong trường hợp ly thân vì lý do nghiêm trọng, họ có được phép tái hôn với người khác không?",
    options: ["Được, nếu đã có quyết định của tòa án dân sự.","Được, nếu người kia đã bỏ đi quá lâu.","Không, họ vẫn là vợ chồng trước mặt Chúa bao lâu người kia còn sống.","Được, nếu đã xin phép linh mục quản xứ."],
    correctAnswer: 2, explanation: "Ly thân không cắt đứt dây hôn phối — vẫn là vợ chồng trước mặt Chúa.", relatedLesson: "bai-12" },
  { id: "q-b111213-14", groupId: "B111213", question: "Hội Thánh có thái độ nào với những người đã ly dị và tái hôn theo luật đời?",
    options: ["Tuyệt thông và đuổi họ ra khỏi Hội thánh.","Cho phép họ rước lễ bình thường nếu họ đóng góp nhiều cho giáo xứ.","Ân cần mời gọi tham dự Thánh lễ, cầu nguyện và làm việc bác ái dù không được rước lễ.","Không quan tâm đến hoàn cảnh của họ."],
    correctAnswer: 2, explanation: "Hội Thánh ân cần mời gọi họ tiếp tục sống đời đức tin.", relatedLesson: "bai-12" },
  { id: "q-b111213-15", groupId: "B111213", question: "Đâu là một biện pháp ngăn ngừa xung đột trước khi kết hôn?",
    options: ["Tin vào những ảo tưởng màu hồng về người yêu.","Biến hôn nhân thành một cuộc mua bán, đổi chác.","Tìm hiểu nhau kỹ lưỡng và học hỏi kiến thức để nuôi dưỡng tình yêu.","Chỉ tập trung vào việc chuẩn bị tiệc cưới linh đình."],
    correctAnswer: 2, explanation: "Tìm hiểu kỹ và nuôi dưỡng tình yêu là biện pháp ngăn ngừa xung đột.", relatedLesson: "bai-11" },
];

export const prayers: Prayer[] = [
  { id: "kinh-tin", title: "Kinh Tin",
    body: "Lạy Chúa, con tin thật có một Đức Chúa Trời là Đấng thưởng phạt vô cùng. Con lại tin thật Đức Chúa Trời có Ba Ngôi, mà Ngôi Thứ Hai đã xuống thế làm Người, chịu nạn chịu chết mà chuộc tội cho thiên hạ. Bấy nhiêu điều ấy cùng các điều Hội Thánh dạy thì con tin vững vàng, vì Chúa là Đấng thông minh và chân thật vô cùng đã phán truyền cho Hội Thánh. Amen." },
  { id: "kinh-cay", title: "Kinh Cậy",
    body: "Lạy Chúa, con trông cậy vững vàng, vì công nghiệp Đức Chúa Giêsu thì Chúa sẽ ban ơn cho con giữ đạo nên ở đời này, cho ngày sau được lên thiên đàng xem thấy mặt Đức Chúa Trời hưởng phúc đời đời, vì Chúa là đấng phép tắc và lòng lành vô cùng đã phán hứa sự ấy chẳng có lẽ nào sai được. Amen." },
  { id: "kinh-men", title: "Kinh Mến",
    body: "Lạy Chúa, con kính mến Chúa hết lòng hết sức trên hết mọi sự, vì Chúa là Đấng trọn tốt trọn lành vô cùng, lại vì Chúa, thì con thương yêu người ta như mình con vậy. Amen." },
  { id: "kinh-an-nan-toi", title: "Kinh Ăn Năn Tội",
    body: "Lạy Chúa con, Chúa là Đấng trọn tốt trọn lành vô cùng. Chúa đã dựng nên con, và cho Con Chúa ra đời chịu nạn chịu chết vì con, mà con đã cả lòng phản nghịch lỗi nghĩa cùng Chúa, thì con lo buồn đau đớn, cùng chê ghét mọi tội con trên hết mọi sự, con dốc lòng chừa cải, và nhờ ơn Chúa, thì con sẽ lánh xa dịp tội, cùng làm việc đền tội cho xứng. Amen." },
  { id: "kinh-lay-cha", title: "Kinh Lạy Cha",
    body: "Lạy Cha chúng con ở trên trời, chúng con nguyện Danh Cha cả sáng, nước Cha trị đến, ý Cha thể hiện dưới đất cũng như trên trời. Xin Cha cho chúng con hôm nay lương thực hằng ngày, và tha nợ chúng con, như chúng con cũng tha kẻ có nợ chúng con. Xin chớ để chúng con sa chước cám dỗ, nhưng cứu chúng con cho khỏi sự dữ. Amen." },
  { id: "kinh-kinh-mung", title: "Kinh Kính Mừng",
    body: "Kính mừng Maria đầy ơn phúc, Đức Chúa Trời ở cùng Bà, Bà có phúc lạ hơn mọi người nữ, và Giêsu con lòng Bà gồm phúc lạ. Thánh Maria Đức Mẹ Chúa Trời cầu cho chúng con là kẻ có tội, khi nay và trong giờ lâm tử. Amen." },
  { id: "kinh-sang-danh", title: "Kinh Sáng Danh",
    body: "Sáng Danh Đức Chúa Cha, và Đức Chúa Con, và Đức Chúa Thánh Thần, như đã có trước vô cùng, và bây giờ, và hằng có, và đời đời chẳng cùng. Amen." },
  { id: "kinh-sang-soi", title: "Kinh Sáng Soi",
    body: "Cúi xin Chúa sáng soi cho chúng con được biết việc phải làm, cùng khi làm xin Chúa giúp đỡ cho mỗi kinh mỗi việc chúng con, từ khởi sự cho đến hoàn thành đều nhờ bởi ơn Chúa. Amen." },
  { id: "kinh-muoi-dieu-ran", title: "Kinh Mười Điều Răn",
    body: "Đạo Đức Chúa Trời có mười điều răn:\nThứ nhất: Thờ phượng một Đức Chúa Trời và kính mến Người trên hết mọi sự.\nThứ hai: Chớ kêu tên Đức Chúa Trời vô cớ.\nThứ ba: Giữ ngày Chúa Nhật.\nThứ bốn: Thảo kính cha mẹ.\nThứ năm: Chớ giết người.\nThứ sáu: Chớ làm sự dâm dục.\nThứ bảy: Chớ lấy của người.\nThứ tám: Chớ làm chứng dối.\nThứ chín: Chớ muốn vợ chồng người.\nThứ mười: Chớ tham của người.\nMười điều răn ấy tóm về hai này mà chớ: trước kính mến một Đức Chúa Trời trên hết mọi sự, sau lại yêu người như mình ta vậy. Amen." },
];

export const fillBlankItems: FillBlankItem[] = [
  // ===== Prayer Mode =====
  { id: "fb-p-1", type: "prayer", sourceTitle: "Kinh Lạy Cha", difficulty: "easy",
    fullSentence: "Lạy Cha chúng con ở trên trời, chúng con nguyện Danh Cha cả sáng.",
    blankedSentence: "Lạy Cha chúng con ở trên ____, chúng con nguyện Danh Cha cả sáng.",
    answer: "trời", hint: "Nơi Cha của chúng con ngự." },
  { id: "fb-p-2", type: "prayer", sourceTitle: "Kinh Lạy Cha", difficulty: "medium",
    fullSentence: "Xin Cha cho chúng con hôm nay lương thực hằng ngày.",
    blankedSentence: "Xin Cha cho chúng con hôm nay ____ hằng ngày.",
    answer: "lương thực", hint: "Cái nuôi sống thân xác mỗi ngày." },
  { id: "fb-p-3", type: "prayer", sourceTitle: "Kinh Lạy Cha", difficulty: "medium",
    fullSentence: "Xin chớ để chúng con sa chước cám dỗ, nhưng cứu chúng con cho khỏi sự dữ.",
    blankedSentence: "Xin chớ để chúng con sa chước ____, nhưng cứu chúng con cho khỏi sự dữ.",
    answer: "cám dỗ", hint: "Điều mà ma quỷ thường dùng để lôi kéo." },
  { id: "fb-p-4", type: "prayer", sourceTitle: "Kinh Kính Mừng", difficulty: "easy",
    fullSentence: "Kính mừng Maria đầy ơn phúc, Đức Chúa Trời ở cùng Bà.",
    blankedSentence: "Kính mừng Maria đầy ____ phúc, Đức Chúa Trời ở cùng Bà.",
    answer: "ơn", hint: "Hồng ân Chúa ban." },
  { id: "fb-p-5", type: "prayer", sourceTitle: "Kinh Kính Mừng", difficulty: "medium",
    fullSentence: "Thánh Maria Đức Mẹ Chúa Trời cầu cho chúng con là kẻ có tội, khi nay và trong giờ lâm tử.",
    blankedSentence: "Thánh Maria Đức Mẹ Chúa Trời ____ cho chúng con là kẻ có tội.",
    answer: "cầu", hint: "Lời nguyện gửi lên Chúa." },
  { id: "fb-p-6", type: "prayer", sourceTitle: "Kinh Tin", difficulty: "medium",
    fullSentence: "Con lại tin thật Đức Chúa Trời có Ba Ngôi.",
    blankedSentence: "Con lại tin thật Đức Chúa Trời có ____ Ngôi.",
    answer: "Ba", hint: "Số Ngôi của Thiên Chúa." },
  { id: "fb-p-7", type: "prayer", sourceTitle: "Kinh Cậy", difficulty: "hard",
    fullSentence: "Lạy Chúa, con trông cậy vững vàng, vì công nghiệp Đức Chúa Giêsu.",
    blankedSentence: "Lạy Chúa, con trông cậy ____, vì công nghiệp Đức Chúa Giêsu.",
    answer: "vững vàng", hint: "Bền chặt, không lay chuyển." },
  { id: "fb-p-8", type: "prayer", sourceTitle: "Kinh Mến", difficulty: "medium",
    fullSentence: "Lạy Chúa, con kính mến Chúa hết lòng hết sức trên hết mọi sự.",
    blankedSentence: "Lạy Chúa, con kính mến Chúa hết lòng hết ____ trên hết mọi sự.",
    answer: "sức", hint: "Đi cùng với 'lòng'." },
  { id: "fb-p-9", type: "prayer", sourceTitle: "Kinh Ăn Năn Tội", difficulty: "hard",
    fullSentence: "Con dốc lòng chừa cải, và nhờ ơn Chúa, thì con sẽ lánh xa dịp tội.",
    blankedSentence: "Con dốc lòng chừa cải, và nhờ ơn Chúa, thì con sẽ lánh xa ____ tội.",
    answer: "dịp", hint: "Hoàn cảnh dễ phạm tội." },
  { id: "fb-p-10", type: "prayer", sourceTitle: "Kinh Sáng Danh", difficulty: "easy",
    fullSentence: "Sáng Danh Đức Chúa Cha, và Đức Chúa Con, và Đức Chúa Thánh Thần.",
    blankedSentence: "Sáng Danh Đức Chúa Cha, và Đức Chúa ____, và Đức Chúa Thánh Thần.",
    answer: "Con", hint: "Ngôi Thứ Hai." },
  { id: "fb-p-11", type: "prayer", sourceTitle: "Kinh Sáng Soi", difficulty: "medium",
    fullSentence: "Cúi xin Chúa sáng soi cho chúng con được biết việc phải làm.",
    blankedSentence: "Cúi xin Chúa ____ soi cho chúng con được biết việc phải làm.",
    answer: "sáng", hint: "Trái với tối." },
  { id: "fb-p-12", type: "prayer", sourceTitle: "Kinh Mười Điều Răn", difficulty: "easy",
    fullSentence: "Thứ bốn: Thảo kính cha mẹ.",
    blankedSentence: "Thứ bốn: Thảo kính ____ mẹ.",
    answer: "cha", hint: "Đấng sinh thành cùng với mẹ." },
  { id: "fb-p-13", type: "prayer", sourceTitle: "Kinh Mười Điều Răn", difficulty: "medium",
    fullSentence: "Mười điều răn ấy tóm về hai này: trước kính mến một Đức Chúa Trời trên hết mọi sự, sau lại yêu người như mình ta vậy.",
    blankedSentence: "Mười điều răn ấy tóm về hai: trước kính mến một Đức Chúa Trời, sau lại yêu người như ____ ta vậy.",
    answer: "mình", hint: "Đại từ chỉ chính ta." },

  // ===== Catechism Mode =====
  { id: "fb-c-1", type: "catechism", sourceTitle: "Bài 1: Định nghĩa hôn nhân", difficulty: "medium",
    fullSentence: "Hôn nhân là một giao ước ký kết giữa một người nam và một người nữ.",
    blankedSentence: "Hôn nhân là một ____ ký kết giữa một người nam và một người nữ.",
    answer: "giao ước", hint: "Cao hơn 'hợp đồng' — mang chiều kích thánh." },
  { id: "fb-c-2", type: "catechism", sourceTitle: "Bài 2: Đặc tính hôn nhân Công giáo", difficulty: "medium",
    fullSentence: "Hôn nhân Công giáo có hai đặc tính: đơn nhất và bất khả phân ly.",
    blankedSentence: "Hôn nhân Công giáo có hai đặc tính: đơn nhất và ____.",
    answer: "bất khả phân ly", hint: "Không thể tháo gỡ, trừ cái chết." },
  { id: "fb-c-3", type: "catechism", sourceTitle: "Bài 3: Sự ưng thuận", difficulty: "easy",
    fullSentence: "Sự ưng thuận tự do của đôi nam nữ là yếu tố làm nên hôn nhân.",
    blankedSentence: "Sự ____ tự do của đôi nam nữ là yếu tố làm nên hôn nhân.",
    answer: "ưng thuận", hint: "Đồng ý, chấp nhận." },
  { id: "fb-c-4", type: "catechism", sourceTitle: "Bài 5: Phần cốt yếu", difficulty: "medium",
    fullSentence: "Phần cốt yếu của Bí tích Hôn phối là trao đổi lời thề hứa.",
    blankedSentence: "Phần cốt yếu của Bí tích Hôn phối là trao đổi ____ thề hứa.",
    answer: "lời", hint: "Điều ta nói ra để cam kết." },
  { id: "fb-c-5", type: "catechism", sourceTitle: "Bài 7: Tình yêu vợ chồng", difficulty: "hard",
    fullSentence: "Tình yêu vợ chồng đòi hỏi sự trao hiến trọn vẹn, chung thủy suốt đời và mở ngỏ cho sự sống.",
    blankedSentence: "Tình yêu vợ chồng đòi hỏi sự trao hiến trọn vẹn, chung thủy suốt đời và mở ngỏ cho ____ sống.",
    answer: "sự", hint: "Đi cùng với 'sống' — món quà của Thiên Chúa." },
  { id: "fb-c-6", type: "catechism", sourceTitle: "Bài 9: Luật phân cách", difficulty: "medium",
    fullSentence: "Trái tim người nữ chỉ có một ngăn dành trọn cho chồng.",
    blankedSentence: "Trái tim người nữ chỉ có một ____ dành trọn cho chồng.",
    answer: "ngăn", hint: "Khoang nhỏ trong trái tim." },
  { id: "fb-c-7", type: "catechism", sourceTitle: "Bài 10: Cầu nguyện", difficulty: "medium",
    fullSentence: "Cầu nguyện chung giúp gia đình có Chúa ở cùng — Ngài là nút dây nối kết.",
    blankedSentence: "Cầu nguyện chung giúp gia đình có Chúa ở cùng — Ngài là nút dây ____ kết.",
    answer: "nối", hint: "Liên kết hai bên." },
  { id: "fb-c-8", type: "catechism", sourceTitle: "Bài 12: Hôn nhân trọn vẹn", difficulty: "hard",
    fullSentence: "Hôn nhân trọn vẹn là đã thành sự, là bí tích và đã ăn ở với nhau.",
    blankedSentence: "Hôn nhân trọn vẹn là đã thành sự, là ____ và đã ăn ở với nhau.",
    answer: "bí tích", hint: "Dấu chỉ ban ơn của Chúa Giêsu." },
  { id: "fb-c-9", type: "catechism", sourceTitle: "Bài 13: Hội Thánh tại gia", difficulty: "medium",
    fullSentence: "Gia đình là Hội Thánh tại gia, nơi cha mẹ là người truyền dạy đức tin đầu tiên cho con cái.",
    blankedSentence: "Gia đình là Hội Thánh tại gia, nơi cha mẹ là người truyền dạy ____ tin đầu tiên cho con cái.",
    answer: "đức", hint: "'____ tin' — niềm tin tôn giáo." },
  { id: "fb-c-10", type: "catechism", sourceTitle: "Bài 11: Mục đích tranh luận", difficulty: "hard",
    fullSentence: "Mục đích vợ chồng tranh luận là để tìm ra điều tốt hơn để đi đến chỗ hợp nhất.",
    blankedSentence: "Mục đích vợ chồng tranh luận là để tìm ra điều tốt hơn để đi đến chỗ ____ nhất.",
    answer: "hợp", hint: "Cùng một, không chia rẽ." },
  { id: "fb-c-11", type: "catechism", sourceTitle: "Bài 13: Ba sứ mạng", difficulty: "hard",
    fullSentence: "Gia đình tham dự ba sứ mạng: Ngôn sứ, Tư tế và Mục tử.",
    blankedSentence: "Gia đình tham dự ba sứ mạng: Ngôn sứ, ____ tế và Mục tử.",
    answer: "Tư", hint: "Người dâng lễ — '____ tế'." },
];

export function getLessonsByGroup(groupId: LessonGroupId): Lesson[] {
  return lessons.filter((l) => l.groupId === groupId);
}
export function getQuizByGroup(groupId: LessonGroupId): QuizQuestion[] {
  return quizQuestions.filter((q) => q.groupId === groupId);
}