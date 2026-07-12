// TOEIC Grammar Data
export const grammarData = [
  {
    id: 1,
    title: "Parts of Speech",
    description: "Từ loại là nền tảng cốt lõi của mọi câu trong tiếng Anh. Hiểu rõ chức năng của từng từ loại giúp bạn xác định vị trí cần điền trong câu hỏi Part 5 & 6 một cách nhanh chóng và chính xác.",
    importance: "Chiếm khoảng 30-40% các câu hỏi ngữ pháp trong TOEIC Part 5.",
    formula: [
      "Subject (Danh từ/Đại từ) + Verb (Động từ) + Object (Danh từ/Đại từ)",
      "Modifier (Tính từ) + Noun (Danh từ)",
      "Verb (Động từ) + Modifier (Trạng từ)",
      "Modifier (Trạng từ) + Modifier (Tính từ/Trạng từ khác)"
    ],
    usage: [
      {
        title: "Noun (Danh từ)",
        description: "Làm chủ ngữ, tân ngữ cho động từ hoặc giới từ.",
        signalWords: ["a", "an", "the", "this", "that", "these", "those", "my", "his", "her", "some", "any", "many"]
      },
      {
        title: "Verb (Động từ)",
        description: "Thể hiện hành động hoặc trạng thái của chủ ngữ.",
        signalWords: ["often", "always", "usually", "currently", "recently", "already", "will", "would", "should"]
      },
      {
        title: "Adjective (Tính từ)",
        description: "Bổ nghĩa cho danh từ, đứng trước danh từ hoặc sau động từ liên kết (linking verbs như be, seem, become).",
        signalWords: ["very", "extremely", "quite", "rather", "seem", "look", "become", "feel", "appear"]
      },
      {
        title: "Adverb (Trạng từ)",
        description: "Bổ nghĩa cho động từ, tính từ, trạng từ khác hoặc cả câu. Có thể đứng ở nhiều vị trí.",
        signalWords: ["ly", "fast", "hard", "well", "late", "often", "seldom", "never", "currently", "recently"]
      }
    ],
    examples: [
      {
        english: "The marketing director approved the budget request.",
        vietnamese: "Giám đốc tiếp thị đã chấp thuận yêu cầu ngân sách.",
        explanation: "director (Noun) làm chủ ngữ, approved (Verb) làm động từ chính, request (Noun) làm tân ngữ."
      },
      {
        english: "She completed the highly confidential report yesterday.",
        vietnamese: "Cô ấy đã hoàn thành bản báo cáo tối mật ngày hôm qua.",
        explanation: "highly (Adverb) bổ nghĩa cho tính từ confidential (Adjective), tính từ này bổ nghĩa cho danh từ report."
      },
      {
        english: "The new software performs efficiently under heavy workloads.",
        vietnamese: "Phần mềm mới hoạt động hiệu quả dưới khối lượng công việc nặng.",
        explanation: "performs (Verb) được bổ nghĩa bởi trạng từ efficiently (Adverb)."
      },
      {
        english: "Our employees remain productive during the office relocation.",
        vietnamese: "Nhân viên của chúng tôi vẫn làm việc hiệu quả trong suốt quá trình chuyển văn phòng.",
        explanation: "productive (Adjective) đứng sau động từ liên kết remain."
      },
      {
        english: "Management has recently implemented a new policy regarding remote work.",
        vietnamese: "Ban quản lý gần đây đã thực hiện một chính sách mới liên quan đến làm việc từ xa.",
        explanation: "recently (Adverb) đứng giữa trợ động từ has và động từ chính implemented."
      }
    ],
    tips: [
      "Quy tắc vàng 3 bước cho câu từ loại: 1. Nhìn trước khoảng trống. 2. Nhìn sau khoảng trống. 3. Xác định loại từ cần điền dựa vào cấu trúc xung quanh.",
      "Nếu phía trước có mạo từ (a/an/the) hoặc tính từ sở hữu, và phía sau là giới từ/động từ chính => Chắc chắn điền Danh từ.",
      "Trạng từ có thể bị lược bỏ mà câu vẫn đúng ngữ pháp. Do đó, nếu câu đã đầy đủ thành phần chính (S + V + O) => Chọn Trạng từ."
    ],
    commonMistakes: [
      "Nhầm lẫn danh từ chỉ người và danh từ chỉ vật (ví dụ: consultant vs. consultation). Luôn đọc kỹ ngữ cảnh để chọn đúng.",
      "Đặt tính từ đứng sau danh từ để bổ nghĩa (lỗi dịch word-by-word từ tiếng Việt). Ví dụ: 'report confidential' là sai, phải là 'confidential report'."
    ],
    quiz: [
      {
        question: "The committee members gave their ______ to the proposed budget adjustment after a brief discussion.",
        choices: ["approve", "approval", "approved", "approvingly"],
        answer: "approval",
        explanation: "Sau tính từ sở hữu 'their' cần một danh từ. 'approval' là danh từ (sự chấp thuận).",
        difficulty: "Easy"
      },
      {
        question: "The newly hired technician resolved the server connection issues ______.",
        choices: ["quick", "quickness", "quickly", "quicker"],
        answer: "quickly",
        explanation: "Khoảng trống đứng cuối câu sau cụm tân ngữ để bổ nghĩa cho động từ 'resolved' => Cần trạng từ 'quickly'.",
        difficulty: "Easy"
      },
      {
        question: "Ms. Patel is an ______ designer who has won multiple awards for her innovative product packaging.",
        choices: ["exception", "exceptional", "exceptionally", "exceptions"],
        answer: "exceptional",
        explanation: "Khoảng trống đứng trước danh từ 'designer' để bổ nghĩa cho nó => Cần tính từ 'exceptional' (xuất chúng).",
        difficulty: "Medium"
      },
      {
        question: "Please handle all client data ______ to comply with the federal privacy regulations.",
        choices: ["secure", "security", "securely", "securities"],
        answer: "securely",
        explanation: "Bổ nghĩa cho động từ 'handle' cần một trạng từ => Chọn 'securely' (một cách an toàn/bảo mật).",
        difficulty: "Medium"
      },
      {
        question: "The board of directors deemed the merger proposal ______ due to high financial risks.",
        choices: ["unacceptable", "unacceptably", "unacceptability", "unacceptableness"],
        answer: "unacceptable",
        explanation: "Cấu trúc 'deem + Object + Adjective' (cho rằng cái gì như thế nào) => Chọn tính từ 'unacceptable'.",
        difficulty: "Hard"
      }
    ]
  },
  {
    id: 2,
    title: "Nouns",
    description: "Danh từ (Nouns) chỉ người, vật, sự việc, địa điểm hoặc ý niệm. Trong TOEIC, việc xác định đúng danh từ đếm được, không đếm được, danh từ số ít/số nhiều và danh từ ghép là cực kỳ quan trọng.",
    importance: "Thường xuyên xuất hiện trong Part 5 dưới dạng phân biệt danh từ chỉ người/chỉ vật, hoặc chọn danh từ ghép.",
    formula: [
      "Article/Possessive + Adjective + NOUN",
      "NOUN + NOUN (Danh từ ghép - ví dụ: safety standards)",
      "Preposition + NOUN"
    ],
    usage: [
      {
        title: "Subject / Object",
        description: "Danh từ làm chủ ngữ đứng trước động từ, hoặc làm tân ngữ đứng sau động từ/giới từ.",
        signalWords: ["a", "an", "the", "some", "any", "much", "many", "each", "every"]
      },
      {
        title: "Compound Nouns (Danh từ ghép)",
        description: "Hai hoặc nhiều danh từ đứng cạnh nhau tạo thành một cụm danh từ mới. Danh từ đứng sau đóng vai trò chính, danh từ trước bổ nghĩa.",
        signalWords: ["customer service", "employee benefits", "safety regulations", "performance evaluation"]
      }
    ],
    examples: [
      {
        english: "All representatives must attend the safety training session.",
        vietnamese: "Tất cả các đại diện phải tham gia buổi đào tạo an toàn.",
        explanation: "representatives (danh từ chỉ người) làm chủ ngữ. safety training session là cụm danh từ ghép."
      },
      {
        english: "We received a confirmation from the supplier regarding the shipment.",
        vietnamese: "Chúng tôi đã nhận được sự xác nhận từ nhà cung cấp liên quan đến lô hàng.",
        explanation: "confirmation (danh từ chỉ vật) đứng sau mạo từ 'a'."
      },
      {
        english: "High customer satisfaction leads to brand loyalty.",
        vietnamese: "Sự hài lòng cao của khách hàng dẫn đến lòng trung thành với thương hiệu.",
        explanation: "satisfaction và loyalty là các danh từ không đếm được chỉ ý niệm trừu tượng."
      },
      {
        english: "The marketing agency conducted extensive research on consumer behavior.",
        vietnamese: "Đại lý tiếp thị đã tiến hành nghiên cứu sâu rộng về hành vi của người tiêu dùng.",
        explanation: "research là danh từ không đếm được, không dùng với 'a/an' hoặc dạng số nhiều 'researches'."
      },
      {
        english: "Construction of the new facility will begin next Monday.",
        vietnamese: "Việc xây dựng cơ sở mới sẽ bắt đầu vào thứ Hai tới.",
        explanation: "Construction là danh từ đóng vai trò chủ ngữ của câu."
      }
    ],
    tips: [
      "Hãy cẩn thận với đuôi tính từ nhưng lại là danh từ: -al (proposal, approval, disposal, professional), -ive (representative, executive, alternative, initiative). Đây là các bẫy cực lớn trong TOEIC!",
      "Danh từ đếm được số ít bắt buộc phải có từ hạn định đi kèm (a, an, the, my, this...). Không bao giờ đứng trơ trọi một mình. Ngược lại, danh từ không đếm được và danh từ số nhiều có thể đứng một mình.",
      "Trong danh từ ghép (Noun + Noun), danh từ thứ nhất thường ở dạng số ít (ví dụ: 'account representative' chứ không dùng 'accounts representative')."
    ],
    commonMistakes: [
      "Dùng danh từ đếm được số ít không có mạo từ (ví dụ: 'He is manager' => Sai, phải là 'He is a manager').",
      "Nhầm lẫn giữa danh từ chỉ người và chỉ sự vật khi làm bài dịch nghĩa (ví dụ: 'advertiser' - nhà quảng cáo vs. 'advertisement' - bài quảng cáo)."
    ],
    quiz: [
      {
        question: "Applicants are requested to submit two letters of ______ along with their resume.",
        choices: ["refer", "referee", "reference", "referred"],
        answer: "reference",
        explanation: "Sau giới từ 'of' cần một danh từ. 'letters of reference' là cụm từ cố định nghĩa là thư giới thiệu/tham chiếu.",
        difficulty: "Easy"
      },
      {
        question: "The board approved the budget ______ for the expansion of the regional office.",
        choices: ["propose", "proposal", "proposing", "proposed"],
        answer: "proposal",
        explanation: "Sau mạo từ 'the' và danh từ 'budget' cần danh từ thứ hai để tạo thành danh từ ghép 'budget proposal' (bản đề xuất ngân sách). 'proposal' có đuôi -al nhưng là danh từ.",
        difficulty: "Medium"
      },
      {
        question: "A senior executive from the marketing department will present the new sales ______.",
        choices: ["initiate", "initiator", "initiative", "initially"],
        answer: "initiative",
        explanation: "Sau tính từ 'sales' cần danh từ. 'initiative' (sáng kiến/kế hoạch) là danh từ kết hợp thành 'sales initiative' (sáng kiến bán hàng).",
        difficulty: "Medium"
      },
      {
        question: "To guarantee smooth operations, the factory must maintain strict compliance with safety ______.",
        choices: ["regulations", "regulate", "regulatory", "regulators"],
        answer: "regulations",
        explanation: "Cụm danh từ ghép: 'safety regulations' (quy định an toàn). 'regulators' là người điều tiết/thiết bị điều chỉnh, không hợp nghĩa.",
        difficulty: "Hard"
      },
      {
        question: "Ms. Cho has earned widespread ______ for her leadership during the corporate restructure.",
        choices: ["recognition", "recognize", "recognizable", "recognized"],
        answer: "recognition",
        explanation: "Sau tính từ 'widespread' cần danh từ đóng vai trò tân ngữ cho động từ 'earned' => Chọn 'recognition' (sự công nhận/nể phục).",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 3,
    title: "Pronouns",
    description: "Đại từ (Pronouns) thay thế cho danh từ để tránh lặp từ. TOEIC thường kiểm tra sự hòa hợp giữa đại từ và danh từ được thay thế, cũng như việc phân biệt đại từ nhân xưng, tính từ sở hữu, đại từ phản thân.",
    importance: "Luôn xuất hiện 1-2 câu trong mỗi đề thi TOEIC Part 5.",
    formula: [
      "Subject Pronoun (I, you, we, they, he, she, it) + VERB",
      "VERB + Object Pronoun (me, you, us, them, him, her, it)",
      "Possessive Adjective (my, your, our, their, his, her, its) + NOUN",
      "Possessive Pronoun (mine, yours, ours, theirs, his, hers, its) = Possessive Adjective + Noun",
      "Subject + Verb + Object + Reflexive Pronoun (myself, yourself, ourselves, themselves, himself, herself, itself)"
    ],
    usage: [
      {
        title: "Subject vs. Object",
        description: "Dùng đại từ làm chủ ngữ đứng đầu mệnh đề hoặc làm tân ngữ đứng sau động từ/giới từ.",
        signalWords: ["by myself", "on my own", "by themselves"]
      },
      {
        title: "Reflexive Pronouns (Đại từ phản thân)",
        description: "Dùng khi chủ ngữ và tân ngữ là cùng một đối tượng, hoặc để nhấn mạnh chính chủ ngữ tự thực hiện hành động.",
        signalWords: ["by + reflexive", "subject + reflexive + verb"]
      }
    ],
    examples: [
      {
        english: "Mr. Kim resolved the billing dispute himself.",
        vietnamese: "Ông Kim đã tự mình giải quyết tranh chấp hóa đơn.",
        explanation: "himself là đại từ phản thân dùng để nhấn mạnh chính Mr. Kim thực hiện hành động."
      },
      {
        english: "The marketing team members presented their proposal to the clients.",
        vietnamese: "Các thành viên nhóm tiếp thị đã trình bày đề xuất của họ cho khách hàng.",
        explanation: "their là tính từ sở hữu đứng trước danh từ proposal."
      },
      {
        english: "We compared our product features with theirs.",
        vietnamese: "Chúng tôi đã so sánh các tính năng sản phẩm của chúng tôi với của họ.",
        explanation: "theirs là đại từ sở hữu thay thế cho cụm 'their product features'."
      },
      {
        english: "Please contact me if you have any questions about the contract.",
        vietnamese: "Vui lòng liên hệ với tôi nếu bạn có bất kỳ câu hỏi nào về hợp đồng.",
        explanation: "me là đại từ tân ngữ đứng sau động từ contact."
      },
      {
        english: "The department heads conducted the performance evaluation by themselves.",
        vietnamese: "Các trưởng bộ phận đã tự mình thực hiện đánh giá hiệu suất.",
        explanation: "by themselves mang nghĩa là tự họ làm mà không có sự trợ giúp bên ngoài."
      }
    ],
    tips: [
      "Mẹo làm bài nhanh: Nhìn ngay sau khoảng trống. Nếu có danh từ => Điền Tính từ sở hữu (their, our, my...). Nếu không có danh từ và đã có động từ chính đứng trước => Cực kỳ cân nhắc Đại từ sở hữu hoặc Đại từ phản thân.",
      "Cấu trúc nhấn mạnh: 'Subject + Reflexive Pronoun + Verb' hoặc 'Subject + Verb + Object + Reflexive Pronoun'. Ví dụ: 'She herself wrote the code.'",
      "Cụm từ hay gặp: 'by + reflexive pronoun' = 'on + possessive adjective + own' (tự mình, tự thân)."
    ],
    commonMistakes: [
      "Nhầm lẫn giữa tính từ sở hữu và đại từ sở hữu. Đại từ sở hữu KHÔNG bao giờ đi kèm danh từ ở sau (ví dụ: 'our office' chứ không dùng 'ours office').",
      "Nhầm lẫn 'its' (của nó - tính từ sở hữu) và 'it's' (viết tắt của it is/it has)."
    ],
    quiz: [
      {
        question: "Ms. Lopez scheduled the client meeting ______ because her assistant was on medical leave.",
        choices: ["she", "her", "herself", "hers"],
        answer: "herself",
        explanation: "Chủ ngữ là 'Ms. Lopez', hành động tự thực hiện vì trợ lý nghỉ phép => Chọn đại từ phản thân 'herself'.",
        difficulty: "Easy"
      },
      {
        question: "The consultants will present ______ findings to the executive board tomorrow morning.",
        choices: ["they", "them", "their", "theirs"],
        answer: "their",
        explanation: "Khoảng trống đứng trước danh từ 'findings' => Cần tính từ sở hữu 'their'.",
        difficulty: "Easy"
      },
      {
        question: "We noted that our competitors' delivery time is faster than ______.",
        choices: ["us", "our", "ours", "ourselves"],
        answer: "ours",
        explanation: "So sánh thời gian giao hàng của đối thủ với 'của chúng tôi' (our delivery time) => Cần đại từ sở hữu 'ours'.",
        difficulty: "Medium"
      },
      {
        question: "After reviewing the resume of the applicant, the manager invited ______ for an in-person interview.",
        choices: ["he", "him", "his", "himself"],
        answer: "him",
        explanation: "Khoảng trống đóng vai trò tân ngữ của động từ 'invited' => Cần đại từ tân ngữ 'him'.",
        difficulty: "Easy"
      },
      {
        question: "The participants in the leadership program are encouraged to complete the self-assessment tools by ______.",
        choices: ["they", "them", "their", "themselves"],
        answer: "themselves",
        explanation: "Cụm từ 'by themselves' nghĩa là tự bản thân họ thực hiện.",
        difficulty: "Medium"
      }
    ]
  },
  {
    id: 4,
    title: "Verbs",
    description: "Động từ (Verbs) là linh hồn của câu. Để làm tốt phần động từ trong TOEIC, bạn phải nắm vững cách phân biệt động từ chính (finite verbs) và động từ rút gọn (non-finite verbs), phân biệt nội động từ và ngoại động từ.",
    importance: "Bất kỳ câu nào trong TOEIC Part 5 & 6 cũng cần có động từ chính. Xác định đúng động từ chính giúp loại trừ các đáp án nhiễu rất nhanh.",
    formula: [
      "Subject + VERB (chính) + (Object)",
      "Subject + Auxiliary (trợ động từ) + VERB (nguyên mẫu)",
      "Subject + Verb + to-Verb / Verb-ing (động từ phụ)"
    ],
    usage: [
      {
        title: "Transitive Verbs (Ngoại động từ)",
        description: "Bắt buộc có tân ngữ (Object) đi kèm ở sau ở thể chủ động.",
        signalWords: ["discuss", "reach", "mention", "recommend", "implement", "submit"]
      },
      {
        title: "Intransitive Verbs (Nội động từ)",
        description: "Không cần tân ngữ ở sau, thường đi kèm giới từ hoặc trạng từ.",
        signalWords: ["arrive", "go", "rose", "fall", "occur", "happen", "exist", "remain"]
      }
    ],
    examples: [
      {
        english: "The company plans to expand its product line.",
        vietnamese: "Công ty có kế hoạch mở rộng dòng sản phẩm của mình.",
        explanation: "plans là động từ chính được chia theo chủ ngữ số ít 'The company'. to expand là động từ phụ dạng to-infinitive."
      },
      {
        english: "We discussed the budget proposal during the morning session.",
        vietnamese: "Chúng tôi đã thảo luận về đề xuất ngân sách trong phiên họp sáng.",
        explanation: "discussed là ngoại động từ, theo sau trực tiếp bởi tân ngữ 'the budget proposal'."
      },
      {
        english: "The shipment arrived safely at the warehouse this morning.",
        vietnamese: "Lô hàng đã đến kho an toàn vào sáng nay.",
        explanation: "arrived là nội động từ, không cần tân ngữ trực tiếp, theo sau là trạng từ safely và cụm giới từ."
      },
      {
        english: "Please recommend a suitable candidate for the assistant role.",
        vietnamese: "Vui lòng giới thiệu một ứng viên phù hợp cho vai trò trợ lý.",
        explanation: "recommend là ngoại động từ đi kèm tân ngữ 'a suitable candidate'."
      },
      {
        english: "Unexpected delays occurred due to severe weather conditions.",
        vietnamese: "Sự chậm trễ ngoài dự kiến đã xảy ra do điều kiện thời tiết khắc nghiệt.",
        explanation: "occurred là nội động từ, không bao giờ được chia ở thể bị động."
      }
    ],
    tips: [
      "Mẹo kiểm tra động từ chính: Hãy tìm xem trong câu đã có động từ chia thì chưa. Nếu chưa có => Từ cần điền là động từ chính chia thì. Nếu đã có động từ chính rồi => Từ cần điền là động từ phụ (dạng rút gọn: To-V, V-ing, hoặc V3/ed).",
      "Các nội động từ phổ biến trong TOEIC tuyệt đối không chia bị động: occur, happen, arrive, rise, fall, disappear, remain, exist.",
      "Cẩn thận các từ giống động từ nhưng lại là danh từ hoặc ngược lại (ví dụ: contact, process, plan, review, document có thể là cả hai)."
    ],
    commonMistakes: [
      "Chia bị động cho nội động từ (ví dụ viết: 'the accident was occurred' => Sai, phải viết: 'the accident occurred').",
      "Chọn đáp án dạng V-ing hoặc To-V làm động từ chính duy nhất đứng ngay sau chủ ngữ (ví dụ: 'The manager signing the contract' => Sai, phải là 'The manager signed / is signing...')."
    ],
    quiz: [
      {
        question: "The human resources manager ______ the new company policies during the orientation meeting tomorrow.",
        choices: ["discuss", "discusses", "discussing", "will discuss"],
        answer: "will discuss",
        explanation: "Từ nhận biết 'tomorrow' chỉ tương lai, chủ ngữ cần động từ chính ở thì tương lai đơn => Chọn 'will discuss'.",
        difficulty: "Easy"
      },
      {
        question: "Several key members of the design team decided ______ the company to pursue other opportunities.",
        choices: ["leave", "leaving", "to leave", "left"],
        answer: "to leave",
        explanation: "Cấu trúc động từ đi kèm: 'decide + to-infinitive' (quyết định làm gì) => Chọn 'to leave'.",
        difficulty: "Easy"
      },
      {
        question: "A technical error ______ on the production line, causing a temporary shutdown of the facility.",
        choices: ["occurred", "was occurred", "occurring", "occurs"],
        answer: "occurred",
        explanation: "'occur' là nội động từ, không chia bị động, sự việc đã xảy ra nên dùng quá khứ đơn 'occurred'. 'occurring' không thể làm động từ chính.",
        difficulty: "Medium"
      },
      {
        question: "The supervisor has requested all staff members ______ their weekly timesheets by Friday afternoon.",
        choices: ["submit", "to submit", "submitted", "submitting"],
        answer: "to submit",
        explanation: "Cấu trúc: 'request + someone + to-infinitive' (yêu cầu ai làm gì) => Chọn 'to submit'.",
        difficulty: "Medium"
      },
      {
        question: "Ms. Green has decided to ______ the marketing campaign until the market research is complete.",
        choices: ["suspend", "suspending", "suspension", "suspended"],
        answer: "suspend",
        explanation: "Sau cấu trúc 'decided to' cần động từ nguyên mẫu (bare infinitive) => Chọn 'suspend'.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 5,
    title: "Verb Tenses",
    description: "Thì của động từ (Verb Tenses) xác định thời gian xảy ra hành động. Trong TOEIC, các thì hiện tại đơn, hiện tại tiếp diễn, hiện tại hoàn thành, quá khứ đơn, quá khứ hoàn thành và tương lai đơn là các điểm kiểm tra cốt lõi.",
    importance: "Luôn xuất hiện 2-3 câu trong bài thi TOEIC Part 5 & 6.",
    formula: [
      "Present Simple: S + V(s/es)",
      "Past Simple: S + V2/ed",
      "Present Perfect: S + have/has + V3/ed",
      "Past Perfect: S + had + V3/ed",
      "Future Simple: S + will + V(nguyên mẫu)"
    ],
    usage: [
      {
        title: "Present Perfect (Hiện tại hoàn thành)",
        description: "Hành động xảy ra trong quá khứ kéo dài đến hiện tại, hoặc vừa mới xảy ra, hoặc trải nghiệm.",
        signalWords: ["since", "for", "already", "recently", "lately", "so far", "up to now", "yet", "just"]
      },
      {
        title: "Past Simple vs. Past Perfect",
        description: "Hai hành động trong quá khứ: hành động xảy ra trước dùng Quá khứ hoàn thành (had + V3), hành động xảy ra sau dùng Quá khứ đơn.",
        signalWords: ["before", "after", "by the time", "when"]
      }
    ],
    examples: [
      {
        english: "We have upgraded our server security systems recently.",
        vietnamese: "Chúng tôi đã nâng cấp hệ thống bảo mật máy chủ gần đây.",
        explanation: "recently là dấu hiệu của thì hiện tại hoàn thành, diễn tả hành động vừa mới xảy ra."
      },
      {
        english: "By the time the technician arrived, the staff had resolved the computer crash.",
        vietnamese: "Trước khi kỹ thuật viên đến, nhân viên đã tự giải quyết xong sự cố sập máy tính.",
        explanation: "Hành động giải quyết sự cố xảy ra trước (had resolved), kỹ thuật viên đến sau (arrived)."
      },
      {
        english: "The corporate headquarters currently employs over five hundred professionals.",
        vietnamese: "Trụ sở chính của công ty hiện tại đang thuê hơn năm trăm chuyên gia.",
        explanation: "currently diễn tả tình trạng hiện tại, dùng thì hiện tại đơn."
      },
      {
        english: "The marketing team will launch the new advertising campaign next month.",
        vietnamese: "Nhóm tiếp thị sẽ khởi động chiến dịch quảng cáo mới vào tháng tới.",
        explanation: "next month chỉ tương lai đơn, sử dụng will + launch."
      },
      {
        english: "Last year, the corporation merged with its primary competitor.",
        vietnamese: "Năm ngoái, tập đoàn đã sáp nhập với đối thủ cạnh tranh chính của mình.",
        explanation: "Last year chỉ mốc thời gian xác định trong quá khứ, dùng quá khứ đơn (merged)."
      }
    ],
    tips: [
      "Tìm từ khóa chỉ thời gian (time indicators) trước tiên: since/for => Hiện tại hoàn thành; ago/last year/in 2021 => Quá khứ đơn; next/tomorrow => Tương lai; currently/now => Hiện tại đơn/tiếp diễn.",
      "Cấu trúc 'By the time': By the time + S + V(quá khứ đơn), S + had + V3/ed. By the time + S + V(hiện tại đơn), S + will have + V3/ed (tương lai hoàn thành). Học thuộc lòng công thức này!",
      "Trong các mệnh đề chỉ thời gian bắt đầu bằng when, as soon as, before, after, by the time... dùng hiện tại đơn để diễn tả hành động ở tương lai, không dùng 'will'."
    ],
    commonMistakes: [
      "Dùng thì quá khứ đơn khi có since/for (ví dụ: 'I worked here since 2018' => Sai, phải là 'I have worked here since 2018').",
      "Sử dụng 'will' trong mệnh đề phụ chỉ thời gian (ví dụ: 'When the guest will arrive, we will start' => Sai, phải là 'When the guest arrives...')."
    ],
    quiz: [
      {
        question: "Ms. Chen ______ as the head of the marketing department since she joined the company in 2019.",
        choices: ["served", "serves", "has served", "is serving"],
        answer: "has served",
        explanation: "Có 'since + mốc thời gian quá khứ' => Động từ ở mệnh đề chính phải chia Hiện tại hoàn thành 'has served'.",
        difficulty: "Easy"
      },
      {
        question: "By the time the delivery truck finally reached the store, the manager ______ the order.",
        choices: ["canceled", "has canceled", "had canceled", "cancels"],
        answer: "had canceled",
        explanation: "Cấu trúc 'By the time + S + V(quá khứ đơn), S + had + V3' => Chọn 'had canceled'.",
        difficulty: "Medium"
      },
      {
        question: "Our CEO ______ a press conference tomorrow to address the security breach.",
        choices: ["holds", "held", "will hold", "holding"],
        answer: "will hold",
        explanation: "Có 'tomorrow' chỉ thời gian tương lai => Dùng tương lai đơn 'will hold'.",
        difficulty: "Easy"
      },
      {
        question: "The IT department ______ a new software update for all office computers yesterday evening.",
        choices: ["install", "installed", "has installed", "installs"],
        answer: "installed",
        explanation: "Có 'yesterday evening' chỉ thời gian đã kết thúc trong quá khứ => Dùng quá khứ đơn 'installed'.",
        difficulty: "Easy"
      },
      {
        question: "As soon as the financial audit ______, the accounting team will release the quarterly reports.",
        choices: ["concludes", "concluded", "will conclude", "concluding"],
        answer: "concludes",
        explanation: "Trong mệnh đề thời gian bắt đầu bằng 'As soon as', dùng hiện tại đơn để diễn tả tương lai => Chọn 'concludes'.",
        difficulty: "Medium"
      }
    ]
  },
  {
    id: 6,
    title: "Subject-Verb Agreement",
    description: "Sự hòa hợp giữa Chủ ngữ và Động từ (S-V Agreement) yêu cầu chủ ngữ số ít đi với động từ số ít, chủ ngữ số nhiều đi với động từ số nhiều. Bài thi TOEIC thường đánh lừa bằng cách chèn các cụm từ dài giữa chủ ngữ và động từ.",
    importance: "Là phần ngữ pháp rất cơ bản nhưng lại cực kỳ hay xuất hiện trong Part 5 & 6.",
    formula: [
      "Singular Subject + Singular Verb (V-s/es, is, was, has)",
      "Plural Subject + Plural Verb (V-nguyên mẫu, are, were, have)",
      "Subject + [Prepositional Phrase / Relative Clause] + VERB (chia theo Subject chính)"
    ],
    usage: [
      {
        title: "Prepositional Phrases (Cụm giới từ xen giữa)",
        description: "Danh từ đứng trong cụm giới từ (of, in, for, with...) đứng sau chủ ngữ không làm thay đổi chủ ngữ chính.",
        signalWords: ["of", "for", "with", "along with", "together with", "as well as"]
      },
      {
        title: "Indefinite Pronouns (Đại từ bất định)",
        description: "Các đại từ bất định luôn đi với động từ số ít.",
        signalWords: ["everyone", "someone", "anyone", "each", "every", "nobody", "either", "neither"]
      }
    ],
    examples: [
      {
        english: "The quality of these products is monitored closely.",
        vietnamese: "Chất lượng của các sản phẩm này được giám sát chặt chẽ.",
        explanation: "Chủ ngữ chính là 'quality' (số ít), không phải 'products'. Do đó động từ là 'is', không phải 'are'."
      },
      {
        english: "Each of the candidates has to undergo a security background check.",
        vietnamese: "Mỗi ứng viên phải trải qua kiểm tra lý lịch an ninh.",
        explanation: "'Each' luôn đi với động từ số ít, do đó dùng 'has'."
      },
      {
        english: "The manager, along with his team members, is attending the seminar.",
        vietnamese: "Quản lý cùng các thành viên nhóm của mình đang tham gia hội thảo.",
        explanation: "Cụm 'along with...' không làm chủ ngữ trở thành số nhiều. Chủ ngữ chính vẫn là 'The manager' => dùng 'is'."
      },
      {
        english: "Both the CEO and the financial director agree on the proposed strategy.",
        vietnamese: "Cả Giám đốc điều hành và Giám đốc tài chính đều đồng ý với chiến lược được đề xuất.",
        explanation: "Cấu trúc 'Both A and B' luôn đi với động từ số nhiều => dùng 'agree'."
      },
      {
        english: "Neither the supervisor nor the workers are responsible for the delay.",
        vietnamese: "Cả người giám sát lẫn các công nhân đều không chịu trách nhiệm về sự chậm trễ này.",
        explanation: "Cấu trúc 'Neither A nor B' chia động từ theo danh từ đứng gần nhất (workers - số nhiều) => dùng 'are'."
      }
    ],
    tips: [
      "Tìm chủ ngữ thực sự của câu bằng cách gạch bỏ các cụm giới từ bắt đầu bằng: of, in, at, with, for, under... Động từ sẽ chia theo từ đứng trước các giới từ này.",
      "Cấu trúc 'Either A or B' hoặc 'Neither A nor B': động từ chia theo B (danh từ đứng sát động từ nhất).",
      "Các từ như 'each', 'every', 'everyone', 'someone', 'no one' luôn luôn đi kèm với động từ số ít, bất chấp các danh từ phía sau có là số nhiều đi nữa."
    ],
    commonMistakes: [
      "Chia động từ theo danh từ đứng ngay trước nó mà quên mất giới từ (ví dụ: 'The price of the apartments are high' => Sai, phải là 'is high' vì chủ ngữ là price).",
      "Nhầm lẫn 'a number of' (nhiều - đi với động từ số nhiều) và 'the number of' (số lượng - đi với động từ số ít)."
    ],
    quiz: [
      {
        question: "The installation of the new security alarms in all office buildings ______ scheduled for this weekend.",
        choices: ["is", "are", "be", "were"],
        answer: "is",
        explanation: "Chủ ngữ chính là 'installation' (danh từ số ít), các cụm giới từ 'of the new security alarms' và 'in all office buildings' là thành phần phụ => Chọn 'is'.",
        difficulty: "Easy"
      },
      {
        question: "A list of eligible candidates for the upcoming promotion ______ sent to the board of directors yesterday.",
        choices: ["was", "were", "are", "been"],
        answer: "was",
        explanation: "Chủ ngữ chính là 'A list' (số ít). Câu ở quá khứ đơn ('yesterday') => Chọn 'was'.",
        difficulty: "Easy"
      },
      {
        question: "Neither the manager nor the sales representatives ______ pleased with the new commission structure.",
        choices: ["is", "was", "are", "has"],
        answer: "are",
        explanation: "Cấu trúc 'Neither A nor B' chia theo danh từ sát động từ nhất là 'representatives' (số nhiều) => Chọn 'are'.",
        difficulty: "Medium"
      },
      {
        question: "Every employee in our production facilities ______ required to wear protective gear at all times.",
        choices: ["is", "are", "were", "have"],
        answer: "is",
        explanation: "'Every' luôn đi với danh từ số ít và động từ số ít => Chọn 'is'.",
        difficulty: "Easy"
      },
      {
        question: "A number of updates ______ made to the corporate website to improve user experience.",
        choices: ["has been", "have been", "was", "is"],
        answer: "have been",
        explanation: "'A number of + danh từ số nhiều' đi với động từ số nhiều => Chọn 'have been'.",
        difficulty: "Medium"
      }
    ]
  },
  {
    id: 7,
    title: "Articles",
    description: "Mạo từ (Articles) gồm a, an (mạo từ bất định) và the (mạo từ xác định). Trong TOEIC, mạo từ dùng để báo hiệu danh từ đứng sau và phân biệt mức độ xác định của danh từ đó.",
    importance: "Mức độ ra đề thấp nhưng là điều kiện cần để hiểu các cấu trúc ngữ pháp phức tạp khác.",
    formula: [
      "A/An + Singular Countable Noun (bắt đầu bằng phụ âm / nguyên âm)",
      "The + Singular/Plural/Uncountable Noun (đối tượng đã xác định)",
      "No Article + Plural/Uncountable Noun (nói chung chung)"
    ],
    usage: [
      {
        title: "A / An",
        description: "Dùng cho danh từ đếm được số ít, chưa xác định, nhắc đến lần đầu.",
        signalWords: ["a university", "an hour", "an MBA degree", "a one-time offer"]
      },
      {
        title: "The",
        description: "Dùng cho cả danh từ số ít, số nhiều và không đếm được khi cả người nói và người nghe đều biết rõ đối tượng đó là gì.",
        signalWords: ["the internet", "the CEO", "the sun", "the first", "the most"]
      }
    ],
    examples: [
      {
        english: "The company hired an accountant to audit their financial records.",
        vietnamese: "Công ty đã thuê một kế toán viên để kiểm toán hồ sơ tài chính của họ.",
        explanation: "accountant bắt đầu bằng âm nguyên âm /ə/ nên dùng mạo từ 'an'."
      },
      {
        english: "The presentation will begin in an hour.",
        vietnamese: "Buổi thuyết trình sẽ bắt đầu trong một giờ nữa.",
        explanation: "'hour' có âm 'h' câm, phát âm bắt đầu bằng nguyên âm /aʊər/ nên dùng 'an'."
      },
      {
        english: "The CEO discussed the new market entry strategy during the meeting.",
        vietnamese: "Giám đốc điều hành đã thảo luận về chiến lược gia nhập thị trường mới trong cuộc họp.",
        explanation: "Cả 'CEO', 'strategy' và 'meeting' đều đã xác định rõ đối với người nghe nên sử dụng 'the'."
      },
      {
        english: "We need to schedule a meeting with our suppliers.",
        vietnamese: "Chúng tôi cần lên lịch một cuộc họp với các nhà cung cấp của chúng tôi.",
        explanation: "'meeting' là danh từ số ít đếm được nhắc đến lần đầu nên dùng 'a'."
      },
      {
        english: "Information on the website is updated regularly.",
        vietnamese: "Thông tin trên trang web được cập nhật thường xuyên.",
        explanation: "'Information' là danh từ không đếm được nói chung nên không dùng mạo từ đứng trước."
      }
    ],
    tips: [
      "Chú ý phát âm chứ không nhìn mặt chữ: 'an hour' (h câm), 'an honest man' (h câm), 'a university' (phát âm là /j/), 'a European country' (phát âm là /j/), 'an MBA' (phát âm chữ M bắt đầu bằng /e/).",
      "Luôn dùng 'the' trước các tính từ so sánh nhất (the best, the most efficient...) và số thứ tự (the first, the second...).",
      "Không dùng mạo từ trước tên các môn học, ngôn ngữ, thể thao, hoặc danh từ không đếm được mang tính chất chung chung (ví dụ: 'We like technology' chứ không dùng 'We like the technology')."
    ],
    commonMistakes: [
      "Dùng 'an' trước các từ bắt đầu bằng nguyên âm chữ viết nhưng phát âm là phụ âm (ví dụ: 'an union' => Sai, phải là 'a union').",
      "Quên mạo từ trước danh từ đếm được số ít (ví dụ: 'she is designer' => Sai, phải là 'she is a designer')."
    ],
    quiz: [
      {
        question: "Mr. Yamato received ______ award for his outstanding sales performance last quarter.",
        choices: ["a", "an", "the", "no article"],
        answer: "an",
        explanation: "Danh từ 'award' bắt đầu bằng âm nguyên âm /ə/ và chưa xác định nên dùng 'an'.",
        difficulty: "Easy"
      },
      {
        question: "Our new regional manager is ______ honest person who values transparency in the workplace.",
        choices: ["a", "an", "the", "no article"],
        answer: "an",
        explanation: "'honest' có âm 'h' câm, phát âm bắt đầu bằng nguyên âm /ɒ/ nên dùng 'an'.",
        difficulty: "Easy"
      },
      {
        question: "We launched ______ new mobile application to improve our customer support services.",
        choices: ["a", "an", "the", "no article"],
        answer: "a",
        explanation: "Danh từ số ít 'application' bắt đầu bằng phụ âm và được nhắc đến lần đầu nên dùng 'a'.",
        difficulty: "Easy"
      },
      {
        question: "Ms. Foster was promoted to become ______ chief financial officer of the corporation.",
        choices: ["a", "an", "the", "no article"],
        answer: "the",
        explanation: "Chức vụ duy nhất trong công ty 'chief financial officer' (Giám đốc tài chính) cần dùng mạo từ xác định 'the'.",
        difficulty: "Medium"
      },
      {
        question: "This laptop is ______ most expensive model available in our store currently.",
        choices: ["a", "an", "the", "no article"],
        answer: "the",
        explanation: "Trước cấu trúc so sánh nhất 'most expensive' phải dùng mạo từ xác định 'the'.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 8,
    title: "Adjectives",
    description: "Tính từ (Adjectives) dùng để miêu tả đặc điểm, tính chất của danh từ. Trong bài thi TOEIC, tính từ thường xuất hiện ở vị trí bổ nghĩa cho danh từ, hoặc sau động từ liên kết. Phân biệt đuôi tính từ chỉ cảm xúc (-ed vs -ing) cũng là chủ điểm quan trọng.",
    importance: "Luôn có từ 2-3 câu hỏi về tính từ trong mỗi đề thi TOEIC Part 5.",
    formula: [
      "Adjective + NOUN",
      "Linking Verb (be, become, remain, seem, feel) + ADJECTIVE",
      "Find/Make/Keep + Object + ADJECTIVE"
    ],
    usage: [
      {
        title: "Attributive Adjectives (Tính từ đứng trước danh từ)",
        description: "Bổ nghĩa trực tiếp cho danh từ đứng sau.",
        signalWords: ["innovative", "effective", "substantial", "detailed", "confidential"]
      },
      {
        title: "Participial Adjectives (Tính từ đuôi -ed vs. -ing)",
        description: "Tính từ đuôi -ed miêu tả cảm giác, phản ứng của đối tượng (thường là người). Tính từ đuôi -ing miêu tả tính chất của sự vật, hiện tượng gây ra cảm xúc đó.",
        signalWords: ["interested/interesting", "excited/exciting", "confused/confusing", "satisfied/satisfying"]
      }
    ],
    examples: [
      {
        english: "The marketing team created an interesting video about customer benefits.",
        vietnamese: "Nhóm tiếp thị đã tạo ra một video thú vị về lợi ích của khách hàng.",
        explanation: "interesting (đuôi -ing) dùng để mô tả tính chất thú vị của cuốn video."
      },
      {
        english: "The board directors were highly satisfied with the quarterly financial results.",
        vietnamese: "Các giám đốc hội đồng quản trị đã rất hài lòng với kết quả tài chính quý.",
        explanation: "satisfied (đuôi -ed) mô tả cảm xúc hài lòng của con người (board directors)."
      },
      {
        english: "Please keep all client records confidential.",
        vietnamese: "Vui lòng giữ cho tất cả hồ sơ khách hàng được bảo mật.",
        explanation: "confidential là tính từ bổ nghĩa cho tân ngữ client records sau cấu trúc 'keep + O + Adj'."
      },
      {
        english: "We need a detailed breakdown of the project expenses.",
        vietnamese: "Chúng tôi cần một bảng phân tích chi tiết các chi phí dự án.",
        explanation: "detailed là tính từ đuôi -ed dùng để bổ nghĩa cho danh từ breakdown."
      },
      {
        english: "The new software update became available for download this morning.",
        vietnamese: "Bản cập nhật phần mềm mới đã có sẵn để tải về vào sáng nay.",
        explanation: "available là tính từ đứng sau động từ liên kết became."
      }
    ],
    tips: [
      "Các hậu tố (suffixes) nhận diện tính từ phổ biến trong TOEIC: -al (critical), -ive (creative), -able/-ible (reliable), -ous (famous), -ful (helpful), -less (careless), -ent/-ant (efficient).",
      "Cấu trúc kinh điển: 'find + Object + Adjective' (thấy cái gì như thế nào), 'make + Object + Adjective' (làm cái gì trở nên thế nào), 'keep + Object + Adjective' (giữ cái gì ở trạng thái nào). Học thuộc lòng cụm này!",
      "Khi gặp câu chọn tính từ dạng phân từ (V-ing vs. V-ed), hãy hỏi xem đối tượng bị tác động (bị động => V-ed) hay đối tượng tự gây ra đặc điểm (chủ động => V-ing)."
    ],
    commonMistakes: [
      "Nhầm lẫn trạng từ và tính từ khi đứng sau động từ liên kết (ví dụ viết: 'He remains quietly' => Sai, phải viết: 'He remains quiet' vì remain cần tính từ).",
      "Dùng sai tính từ chỉ cảm xúc cho sự vật (ví dụ: 'The meeting was bored' => Sai, cuộc họp không có cảm xúc, phải là 'The meeting was boring')."
    ],
    quiz: [
      {
        question: "To remain ______ in the changing market, the retail company is upgrading its online store.",
        choices: ["compete", "competitor", "competitive", "competitively"],
        answer: "competitive",
        explanation: "Sau động từ liên kết 'remain' cần một tính từ. 'competitive' là tính từ (có tính cạnh tranh).",
        difficulty: "Easy"
      },
      {
        question: "The director found the consultant's advice extremely ______ in resolving the logistics issues.",
        choices: ["value", "valuable", "valuably", "valuation"],
        answer: "valuable",
        explanation: "Cấu trúc 'find + Object + Adjective' kết hợp với trạng từ bổ nghĩa 'extremely' => Cần tính từ 'valuable'.",
        difficulty: "Medium"
      },
      {
        question: "All employees who are ______ in attending the leadership seminar must sign up by Friday.",
        choices: ["interest", "interesting", "interested", "interestingly"],
        answer: "interested",
        explanation: "Miêu tả trạng thái cảm xúc của con người (employees) => Cấu trúc 'be interested in' => Chọn 'interested'.",
        difficulty: "Easy"
      },
      {
        question: "Ms. Cho submitted a ______ report analyzing the potential risks of the new investment.",
        choices: ["comprehensive", "comprehensively", "comprehend", "comprehension"],
        answer: "comprehensive",
        explanation: "Khoảng trống đứng trước danh từ 'report' => Cần tính từ 'comprehensive' (toàn diện/chi tiết).",
        difficulty: "Medium"
      },
      {
        question: "The client was ______ with the prompt response from our customer service department.",
        choices: ["please", "pleasing", "pleased", "pleasurably"],
        answer: "pleased",
        explanation: "Miêu tả cảm xúc hài lòng của khách hàng (con người) => Dùng tính từ phân từ bị động 'pleased' (hài lòng).",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 9,
    title: "Adverbs",
    description: "Trạng từ (Adverbs) bổ nghĩa cho động từ, tính từ, trạng từ khác, hoặc toàn bộ câu. Trạng từ trong TOEIC thường được dùng để trả lời cho câu hỏi 'làm việc đó như thế nào' (trạng từ chỉ cách thức).",
    importance: "Xuất hiện cực nhiều dưới dạng điền trạng từ vào vị trí còn thiếu trong cụm động từ hoặc tính từ.",
    formula: [
      "Subject + VERB + Object + ADVERB",
      "Subject + ADVERB + VERB",
      "Subject + Auxiliary + ADVERB + Main Verb (ví dụ: has recently upgraded)",
      "ADVERB + Adjective + Noun (ví dụ: exceptionally high quality)"
    ],
    usage: [
      {
        title: "Adverbs of Manner (Trạng từ chỉ cách thức)",
        description: "Mô tả cách một hành động được thực hiện. Thường có đuôi -ly.",
        signalWords: ["efficiently", "carefully", "professionally", "promptly", "successfully"]
      },
      {
        title: "Adverbs of Degree (Trạng từ chỉ mức độ)",
        description: "Mô tả mức độ của tính chất hoặc hành động.",
        signalWords: ["extremely", "very", "highly", "exceptionally", "quite", "significantly", "relatively"]
      }
    ],
    examples: [
      {
        english: "The engineering team successfully installed the new production line.",
        vietnamese: "Nhóm kỹ sư đã lắp đặt thành công dây chuyền sản xuất mới.",
        explanation: "successfully (Trạng từ) đứng trước động từ chính installed để bổ nghĩa cho nó."
      },
      {
        english: "We need to deal with customer complaints promptly.",
        vietnamese: "Chúng tôi cần giải quyết các khiếu nại của khách hàng một cách nhanh chóng.",
        explanation: "promptly bổ nghĩa cho động từ deal with, đứng ở cuối mệnh đề."
      },
      {
        english: "The company reported exceptionally high revenue growth this quarter.",
        vietnamese: "Công ty báo cáo mức tăng trưởng doanh thu đặc biệt cao trong quý này.",
        explanation: "exceptionally (Trạng từ mức độ) bổ nghĩa cho tính từ high đứng sau nó."
      },
      {
        english: "Prices have risen significantly due to the shortage of raw materials.",
        vietnamese: "Giá cả đã tăng lên đáng kể do tình trạng thiếu nguyên liệu thô.",
        explanation: "significantly bổ nghĩa cho động từ phân từ risen."
      },
      {
        english: "The new software performs relatively well even on older machines.",
        vietnamese: "Phần mềm mới hoạt động tương đối tốt ngay cả trên các máy tính cũ hơn.",
        explanation: "relatively (Trạng từ) bổ nghĩa cho trạng từ well."
      }
    ],
    tips: [
      "Vị trí siêu kinh điển: Đứng giữa trợ động từ (have/has/will/is...) và động từ chính (V3/ed hoặc V-ing). Cứ thấy cấu trúc 'have ______ upgraded' hoặc 'will ______ introduce' thì nhắm mắt điền Trạng từ!",
      "Trạng từ có thể đứng ở bất cứ đâu trừ vị trí đứng ngay trước danh từ để bổ nghĩa trực tiếp cho danh từ đó (đó là vị trí của Tính từ).",
      "Nếu câu đã hoàn chỉnh các thành phần ngữ pháp (S + V + O) mà cuối câu vẫn có khoảng trống => Chọn Trạng từ."
    ],
    commonMistakes: [
      "Chọn trạng từ đứng trước danh từ để bổ nghĩa (ví dụ: 'an efficiently worker' => Sai, phải là 'an efficient worker').",
      "Nhầm lẫn một số trạng từ đặc biệt không có đuôi -ly: fast, hard, late, well, high."
    ],
    quiz: [
      {
        question: "The newly updated database now allows staff members to retrieve client records ______.",
        choices: ["ease", "easy", "easily", "easier"],
        answer: "easily",
        explanation: "Bổ nghĩa cho động từ 'retrieve' cần một trạng từ ở cuối câu => Chọn 'easily'.",
        difficulty: "Easy"
      },
      {
        question: "Our design team worked ______ to meet the tight deadline for the marketing launch.",
        choices: ["hardly", "hard", "hardness", "harder"],
        answer: "hard",
        explanation: "'work hard' là cụm cố định (làm việc chăm chỉ). Trạng từ của 'hard' vẫn là 'hard'. 'hardly' mang nghĩa là 'hầu như không', không phù hợp.",
        difficulty: "Medium"
      },
      {
        question: "The director has ______ approved the hiring of three new sales assistants.",
        choices: ["final", "finalize", "finally", "finalized"],
        answer: "finally",
        explanation: "Khoảng trống đứng giữa trợ động từ 'has' và động từ chính 'approved' => Điền trạng từ 'finally'.",
        difficulty: "Easy"
      },
      {
        question: "The research laboratory reported ______ high levels of radiation in the test samples.",
        choices: ["abnormal", "abnormally", "abnormality", "abnormalities"],
        answer: "abnormally",
        explanation: "Khoảng trống đứng trước tính từ 'high' để bổ nghĩa cho nó => Cần trạng từ mức độ 'abnormally' (bất thường).",
        difficulty: "Medium"
      },
      {
        question: "If you want to receive the refund, you must submit the completed form ______ after the purchase date.",
        choices: ["immediate", "immediately", "immediacy", "immediateness"],
        answer: "immediately",
        explanation: "Bổ nghĩa cho động từ 'submit' => Cần trạng từ 'immediately' (ngay lập tức).",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 10,
    title: "Prepositions",
    description: "Giới từ (Prepositions) liên kết danh từ, đại từ với các từ khác trong câu. TOEIC kiểm tra rất kỹ giới từ chỉ thời gian, nơi chốn, hướng đi và đặc biệt là các cụm giới từ cố định (collocations).",
    importance: "Mỗi đề thi TOEIC có ít nhất 2-4 câu hỏi trực tiếp hoặc gián tiếp liên quan đến giới từ.",
    formula: [
      "PREPOSITION + Noun / Pronoun / V-ing",
      "Subject + Verb + PREPOSITION + Object",
      "Adjective / Noun + PREPOSITION"
    ],
    usage: [
      {
        title: "Prepositions of Time (Giới từ chỉ thời gian)",
        description: "Xác định mốc hoặc khoảng thời gian xảy ra hành động.",
        signalWords: ["at + giờ", "on + ngày/thứ", "in + tháng/năm/mùa", "since + mốc", "for + khoảng", "by + trước mốc", "until + cho đến"]
      },
      {
        title: "Prepositions of Place (Giới từ chỉ nơi chốn)",
        description: "Xác định vị trí không gian.",
        signalWords: ["at + điểm cụ thể", "in + không gian kín/thành phố/quốc gia", "on + bề mặt"]
      }
    ],
    examples: [
      {
        english: "The executive meeting will begin promptly at 9:00 AM.",
        vietnamese: "Cuộc họp điều hành sẽ bắt đầu đúng lúc 9 giờ sáng.",
        explanation: "at dùng trước mốc thời gian cụ thể (giờ giấc)."
      },
      {
        english: "We must submit the financial statements by next Friday.",
        vietnamese: "Chúng tôi phải nộp báo cáo tài chính trước thứ Sáu tuần tới.",
        explanation: "by dùng để diễn tả hành động phải hoàn thành muộn nhất là tại mốc thời gian đó."
      },
      {
        english: "Mr. Davis is responsible for managing the software development project.",
        vietnamese: "Ông Davis chịu trách nhiệm quản lý dự án phát triển phần mềm.",
        explanation: "Cụm tính từ cố định: 'be responsible for' (chịu trách nhiệm về)."
      },
      {
        english: "The corporate offices are located in the heart of downtown.",
        vietnamese: "Các văn phòng công ty nằm ở trung tâm của thành phố.",
        explanation: "in dùng với vị trí địa lý/thành phố/khu vực lớn."
      },
      {
        english: "The sales figures increased from 5 million to 8 million dollars.",
        vietnamese: "Doanh số bán hàng đã tăng từ 5 triệu lên 8 triệu đô la.",
        explanation: "Cấu trúc 'increase from A to B' chỉ mức biến động."
      }
    ],
    tips: [
      "Mẹo làm bài phân biệt 'by' và 'until': 'by' + mốc thời gian diễn tả hành động xảy ra một lần duy nhất rồi kết thúc trước mốc đó (ví dụ: submit, complete, arrive). 'until' + mốc thời gian diễn tả trạng thái kéo dài liên tục cho đến mốc đó (ví dụ: stay, remain, delay, wait).",
      "Học thuộc các cụm động từ/tính từ đi kèm giới từ hay ra nhất: comply with (tuân thủ), lag behind (tụt hậu), benefit from (hưởng lợi từ), be interested in (quan tâm), depend on (phụ thuộc vào).",
      "Giới từ luôn đi kèm với danh từ hoặc động từ thêm -ing (V-ing), không bao giờ đi kèm trực tiếp với động từ nguyên mẫu."
    ],
    commonMistakes: [
      "Nhầm lẫn 'since' và 'for'. 'since' + mốc thời gian (since 2010), 'for' + khoảng thời gian (for 3 years).",
      "Dùng sai giới từ đi kèm động từ do dịch trực tiếp từ tiếng Việt (ví dụ: 'discuss about the plan' => Sai, discuss là ngoại động từ không cần giới từ about, chỉ dùng 'discuss the plan')."
    ],
    quiz: [
      {
        question: "All employees must submit their vacation requests ______ at least two weeks before their planned departure date.",
        choices: ["for", "in", "by", "until"],
        answer: "by",
        explanation: "Hành động nộp yêu cầu ('submit') xảy ra một lần trước thời hạn => Dùng 'by' (trước/hạn chót).",
        difficulty: "Medium"
      },
      {
        question: "Ms. Green is in charge ______ the research and development division at our headquarters.",
        choices: ["to", "for", "with", "of"],
        answer: "of",
        explanation: "Cụm danh từ cố định: 'in charge of' (chịu trách nhiệm/phụ trách).",
        difficulty: "Easy"
      },
      {
        question: "The new production line will help us comply ______ the federal environmental protection laws.",
        choices: ["to", "with", "at", "for"],
        answer: "with",
        explanation: "Cụm động từ cố định: 'comply with' (tuân thủ theo).",
        difficulty: "Easy"
      },
      {
        question: "We saw a significant increase ______ online sales after introducing the mobile application.",
        choices: ["in", "at", "on", "to"],
        answer: "in",
        explanation: "Cụm danh từ đi với giới từ: 'an increase/decrease in something' (sự tăng/giảm trong lĩnh vực gì).",
        difficulty: "Medium"
      },
      {
        question: "The seminar on digital marketing will be held ______ July 15th at the convention center.",
        choices: ["at", "in", "on", "for"],
        answer: "on",
        explanation: "Trước một ngày cụ thể (July 15th) bắt buộc dùng giới từ 'on'.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 11,
    title: "Conjunctions",
    description: "Liên từ (Conjunctions) dùng để kết nối các từ, cụm từ, hoặc các mệnh đề lại với nhau. TOEIC đặc biệt tập trung vào liên từ chỉ nguyên nhân, kết quả, sự tương phản và các cặp liên từ tương hỗ.",
    importance: "Chiếm từ 2-3 câu trong Part 5 & 6, đòi hỏi học viên phân biệt được Liên từ và Giới từ.",
    formula: [
      "Clause + CONJUNCTION (Liên từ) + Clause",
      "PREPOSITION (Giới từ) + Noun Phrase / V-ing"
    ],
    usage: [
      {
        title: "Cause and Effect (Nguyên nhân - Kết quả)",
        description: "Thể hiện quan hệ nhân quả giữa hai mệnh đề.",
        signalWords: ["because", "since", "as", "now that", "therefore", "thus", "consequently"]
      },
      {
        title: "Contrast (Tương phản)",
        description: "Thể hiện quan hệ đối lập giữa hai mệnh đề.",
        signalWords: ["although", "even though", "though", "while", "whereas", "however", "nevertheless"]
      }
    ],
    examples: [
      {
        english: "Although the project faced severe delays, the team completed it on time.",
        vietnamese: "Mặc dù dự án đối mặt với sự chậm trễ nghiêm trọng, nhóm vẫn hoàn thành đúng hạn.",
        explanation: "Although liên kết hai mệnh đề có quan hệ đối lập."
      },
      {
        english: "Due to the storm, the scheduled flights were canceled.",
        vietnamese: "Do cơn bão, các chuyến bay theo lịch trình đã bị hủy.",
        explanation: "Due to là giới từ nên đi kèm cụm danh từ 'the storm', không đi kèm mệnh đề."
      },
      {
        english: "The marketing director approved the budget because she believed in the product's potential.",
        vietnamese: "Giám đốc tiếp thị đã thông qua ngân sách vì bà tin vào tiềm năng của sản phẩm.",
        explanation: "because là liên từ, đi kèm mệnh đề chỉ nguyên nhân."
      },
      {
        english: "Either the supervisor or the manager must sign the purchase order.",
        vietnamese: "Hoặc người giám sát hoặc người quản lý phải ký vào đơn đặt hàng.",
        explanation: "Cặp liên từ tương hỗ 'Either ... or' kết nối hai danh từ."
      },
      {
        english: "Sales have grown steadily, whereas overhead costs have remained constant.",
        vietnamese: "Doanh số bán hàng đã tăng trưởng đều đặn, trong khi chi phí cố định vẫn giữ nguyên.",
        explanation: "whereas thể hiện sự so sánh đối lập giữa hai thực trạng."
      }
    ],
    tips: [
      "Quy tắc vàng phân biệt Liên từ vs. Giới từ: Nhìn sau khoảng trống. Nếu là một MỆNH ĐỀ (có chứa động từ chính đã chia thì) => Chọn Liên từ (although, because, while). Nếu là một CỤM DANH TỪ/V-ING (không có động từ chính chia thì) => Chọn Giới từ (despite, in spite of, because of, due to, during).",
      "Ghi nhớ các cặp liên từ tương hỗ bắt buộc đi cùng nhau: Either...or; Neither...nor; Both...and; Not only...but also.",
      "Cẩn thận các trạng từ liên kết (conjunctive adverbs) như: however, therefore, nevertheless. Chúng thường đứng đầu câu có dấu phẩy đi kèm ở sau, hoặc đứng sau dấu chấm phẩy (; however,)."
    ],
    commonMistakes: [
      "Dùng liên từ thay cho giới từ (ví dụ viết: 'although the rain' => Sai, 'the rain' là cụm danh từ nên phải dùng 'despite the rain').",
      "Dùng hai liên từ chỉ quan hệ nhân quả hoặc tương phản trong cùng một câu (ví dụ: 'Although he was tired, but he worked' => Sai, trong tiếng Anh chỉ dùng một trong hai từ)."
    ],
    quiz: [
      {
        question: "______ the traffic was heavy due to construction, Ms. Kim arrived at the conference on time.",
        choices: ["Although", "Despite", "Because", "In spite of"],
        answer: "Although",
        explanation: "Sau khoảng trống là một mệnh đề ('the traffic was heavy...') => Cần một liên từ chỉ sự tương phản => Chọn 'Although'. 'Despite' và 'In spite of' là giới từ.",
        difficulty: "Easy"
      },
      {
        question: "The factory output decreased ______ the recent power outages in the industrial zone.",
        choices: ["because", "since", "because of", "as"],
        answer: "because of",
        explanation: "Phía sau khoảng trống là cụm danh từ 'the recent power outages...' => Cần giới từ chỉ nguyên nhân => Chọn 'because of'. Các từ còn lại là liên từ.",
        difficulty: "Easy"
      },
      {
        question: "You can submit your application ______ by email or through our online job portal.",
        choices: ["neither", "either", "both", "whether"],
        answer: "either",
        explanation: "Phía sau có từ 'or' => Đi kèm cặp liên từ tương hỗ 'either ... or'.",
        difficulty: "Easy"
      },
      {
        question: "The company will not release the new software version ______ all critical bugs have been resolved.",
        choices: ["during", "until", "because of", "due to"],
        answer: "until",
        explanation: "Sau khoảng trống là một mệnh đề => Loại các giới từ 'during', 'because of', 'due to' => Chọn liên từ 'until' (cho đến khi).",
        difficulty: "Medium"
      },
      {
        question: "The product launch was highly successful; ______, we will expand our distribution next quarter.",
        choices: ["consequently", "although", "but", "whereas"],
        answer: "consequently",
        explanation: "Đứng sau dấu chấm phẩy và có dấu phẩy ở sau => Cần một trạng từ liên kết chỉ kết quả => Chọn 'consequently' (kết quả là).",
        difficulty: "Hard"
      }
    ]
  },
  {
    id: 12,
    title: "Quantifiers",
    description: "Từ chỉ số lượng (Quantifiers) đi kèm danh từ để thể hiện số lượng cụ thể hoặc ước lượng. Trong TOEIC, bạn phải nắm rõ từ chỉ lượng nào đi với danh từ đếm được số ít, đếm được số nhiều hoặc danh từ không đếm được.",
    importance: "Thường xuất hiện trong các câu hỏi ngữ pháp liên quan đến sự hòa hợp chủ ngữ - động từ hoặc chọn từ hạn định phù hợp.",
    formula: [
      "Quantifier + NOUN",
      "Quantifier + of + the/possessive + NOUN"
    ],
    usage: [
      {
        title: "With Plural Nouns (Đi với danh từ đếm được số nhiều)",
        description: "Chỉ số lượng của các đối tượng đếm được.",
        signalWords: ["many", "few", "a few", "several", "a number of", "both", "numerous"]
      },
      {
        title: "With Uncountable Nouns (Đi với danh từ không đếm được)",
        description: "Chỉ lượng của các chất liệu, ý niệm không đếm được.",
        signalWords: ["much", "little", "a little", "a great deal of", "less", "amount of"]
      }
    ],
    examples: [
      {
        english: "We received numerous inquiries regarding the new product launch.",
        vietnamese: "Chúng tôi đã nhận được vô số câu hỏi liên quan đến việc ra mắt sản phẩm mới.",
        explanation: "numerous đi với danh từ đếm được số nhiều 'inquiries'."
      },
      {
        english: "The marketing campaign requires a great deal of effort from the team.",
        vietnamese: "Chiến dịch tiếp thị đòi hỏi rất nhiều nỗ lực từ đội ngũ.",
        explanation: "a great deal of đi với danh từ không đếm được 'effort'."
      },
      {
        english: "Only a few clients expressed interest in the premium package.",
        vietnamese: "Chỉ một vài khách hàng bày tỏ sự quan tâm đến gói cao cấp.",
        explanation: "a few đi với danh từ đếm được số nhiều 'clients', mang nghĩa tích cực (vẫn có vài người)."
      },
      {
        english: "There is little information available about the corporate restructuring plan.",
        vietnamese: "Có rất ít thông tin có sẵn về kế hoạch tái cơ cấu tập đoàn.",
        explanation: "little đi với danh từ không đếm được 'information', mang nghĩa phủ định (hầu như không có)."
      },
      {
        english: "Every employee is responsible for keeping their workstation clean.",
        vietnamese: "Mỗi nhân viên đều chịu trách nhiệm giữ gìn vệ sinh nơi làm việc của mình.",
        explanation: "Every đi trực tiếp với danh từ đếm được số ít 'employee'."
      }
    ],
    tips: [
      "Ghi nhớ sự khác biệt: 'few/little' (hầu như không có - mang nghĩa tiêu cực) vs. 'a few/a little' (có một chút/một vài - mang nghĩa tích cực).",
      "Các từ 'each', 'every', 'either', 'neither', 'another' bắt buộc đi kèm danh từ đếm được số ít.",
      "Bảng phân bổ lượng từ: 'many, few, a few, several' + N(số nhiều); 'much, little, a little' + N(không đếm được); 'some, any, all, most, a lot of' + N(số nhiều hoặc không đếm được)."
    ],
    commonMistakes: [
      "Dùng 'much' với danh từ đếm được (ví dụ: 'much employees' => Sai, phải là 'many employees').",
      "Dùng 'less' cho danh từ đếm được số nhiều (ví dụ: 'less people' => Sai ngữ pháp chuẩn, phải là 'fewer people')."
    ],
    quiz: [
      {
        question: "Due to budget cuts, the department has ______ resources available for the upcoming project.",
        choices: ["fewer", "less", "least", "fewest"],
        answer: "fewer",
        explanation: "'resources' là danh từ đếm được số nhiều => Chọn từ so sánh hơn 'fewer' (ít hơn). 'less' đi với danh từ không đếm được.",
        difficulty: "Medium"
      },
      {
        question: "Ms. Cho spent ______ time reviewing the contract before signing it.",
        choices: ["many", "several", "much", "few"],
        answer: "much",
        explanation: "'time' là danh từ không đếm được => Chọn 'much' (nhiều). 'many', 'several', 'few' chỉ đi với danh từ đếm được số nhiều.",
        difficulty: "Easy"
      },
      {
        question: "We have invited ______ local business owners to participate in the roundtable discussion.",
        choices: ["much", "another", "several", "each"],
        answer: "several",
        explanation: "'business owners' là danh từ đếm được số nhiều => Chọn 'several' (một vài). 'another' và 'each' đi với danh từ số ít, 'much' đi với danh từ không đếm được.",
        difficulty: "Easy"
      },
      {
        question: "There has been ______ interest in the new software update than we initially anticipated.",
        choices: ["few", "less", "fewer", "many"],
        answer: "less",
        explanation: "'interest' là danh từ không đếm được, so sánh với 'than' => Chọn 'less' (ít hơn).",
        difficulty: "Medium"
      },
      {
        question: "______ candidate who applies for the managerial position must undergo a panel interview.",
        choices: ["All", "Several", "Each", "Many"],
        answer: "Each",
        explanation: "Danh từ 'candidate' ở dạng số ít đếm được => Chỉ có 'Each' đi được với danh từ số ít trong các lựa chọn.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 13,
    title: "Modal Verbs",
    description: "Động từ khuyết thiếu (Modal Verbs) bổ nghĩa cho động từ chính để thể hiện khả năng, sự cho phép, nghĩa vụ, lời khuyên. Trong TOEIC, các động từ khuyết thiếu phổ biến là must, should, can, will, may, could.",
    importance: "Xuất hiện trong các câu kiểm tra nghĩa phù hợp hoặc cấu trúc động từ khuyết thiếu ở thể hoàn thành.",
    formula: [
      "Subject + MODAL VERB + Verb (nguyên mẫu không to)",
      "Subject + MODAL VERB + be + V-3/ed (Thể bị động)",
      "Subject + MODAL VERB + have + V-3/ed (Dự đoán/đánh giá việc trong quá khứ)"
    ],
    usage: [
      {
        title: "Obligation / Advice (Nghĩa vụ / Lời khuyên)",
        description: "Thể hiện mức độ bắt buộc hoặc đề xuất làm gì.",
        signalWords: ["must", "have to", "should", "ought to", "had better"]
      },
      {
        title: "Possibility / Permission (Khả năng / Sự cho phép)",
        description: "Dự đoán khả năng xảy ra hoặc xin phép.",
        signalWords: ["can", "could", "may", "might"]
      }
    ],
    examples: [
      {
        english: "All visitors must obtain a security pass at the reception desk.",
        vietnamese: "Tất cả khách truy cập phải nhận thẻ an ninh tại bàn tiếp tân.",
        explanation: "must diễn tả một quy định bắt buộc phải làm."
      },
      {
        english: "We should back up all critical files daily to prevent data loss.",
        vietnamese: "Chúng tôi nên sao lưu tất cả các tệp quan trọng hàng ngày để ngăn ngừa mất dữ liệu.",
        explanation: "should đưa ra một lời khuyên, đề xuất hữu ích."
      },
      {
        english: "The marketing director might attend the regional summit next week.",
        vietnamese: "Giám đốc tiếp thị có thể sẽ tham dự hội nghị thượng đỉnh khu vực vào tuần tới.",
        explanation: "might diễn tả khả năng xảy ra thấp, mang tính phỏng đoán."
      },
      {
        english: "Candidates could have submitted their portfolios earlier.",
        vietnamese: "Đáng lẽ ra các ứng viên có thể nộp danh mục hồ sơ của họ sớm hơn.",
        explanation: "could have + V3 diễn tả một khả năng trong quá khứ nhưng thực tế đã không xảy ra."
      },
      {
        english: "You had better review the budget sheet before submitting it.",
        vietnamese: "Bạn tốt hơn nên xem lại bảng ngân sách trước khi nộp nó.",
        explanation: "had better diễn tả lời khuyên mạnh mẽ, nếu không làm sẽ có hậu quả xấu."
      }
    ],
    tips: [
      "Sau tất cả các động từ khuyết thiếu (must, should, can, could, may, might, will, would...) luôn luôn đi kèm với động từ nguyên mẫu không chia (bare infinitive).",
      "Cấu trúc giả định quá khứ: 'should have + V3' (đáng lẽ nên làm gì trong quá khứ nhưng đã không làm); 'must have + V3' (chắc chắn đã làm gì trong quá khứ).",
      "Phân biệt 'must not' (cấm đoán) và 'do not have to' (không cần thiết phải làm, tự do lựa chọn)."
    ],
    commonMistakes: [
      "Dùng động từ có 'to' sau động từ khuyết thiếu (ví dụ: 'He must to sign the contract' => Sai, phải là 'He must sign...').",
      "Chia động từ khuyết thiếu theo ngôi thứ ba số ít (ví dụ: 'He cans speak English' => Sai, phải là 'He can speak...')."
    ],
    quiz: [
      {
        question: "Applicants ______ possess a valid driver's license to be considered for the courier position.",
        choices: ["must", "should to", "ought", "has to"],
        answer: "must",
        explanation: "Sau khoảng trống là động từ nguyên mẫu 'possess'. 'must' hợp nghĩa bắt buộc. 'should to' sai ngữ pháp (không có to). 'ought' thiếu to. 'has to' sai chia theo số nhiều 'Applicants'.",
        difficulty: "Easy"
      },
      {
        question: "We ______ have ordered the raw materials last week to avoid the current production delay.",
        choices: ["might", "must", "should", "couldn't"],
        answer: "should",
        explanation: "Ý nói: Đáng lẽ chúng ta nên đặt hàng tuần trước (nhưng thực tế đã không đặt) => Cấu trúc 'should have + V3'.",
        difficulty: "Medium"
      },
      {
        question: "According to company policy, employees ______ smoke inside the office building under any circumstances.",
        choices: ["don't have to", "must not", "might not", "should not to"],
        answer: "must not",
        explanation: "Cấm đoán tuyệt đối ('under any circumstances') => Chọn 'must not'.",
        difficulty: "Easy"
      },
      {
        question: "Ms. Patel ______ be at the trade show in Chicago, but we have not received confirmation yet.",
        choices: ["must", "may", "ought to", "have to"],
        answer: "may",
        explanation: "Diễn tả khả năng không chắc chắn ('not received confirmation yet') => Chọn 'may' (có thể).",
        difficulty: "Medium"
      },
      {
        question: "The software installation process ______ be completed within ten minutes.",
        choices: ["should", "must to", "ought", "might to"],
        answer: "should",
        explanation: "Diễn tả sự mong đợi theo logic thông thường => Chọn 'should'. Các từ khác sai cấu trúc khi đi với bare infinitive 'be'.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 14,
    title: "Gerunds and Infinitives",
    description: "Danh động từ (Gerunds - V-ing) và Động từ nguyên mẫu (Infinitives - to-V). Trong TOEIC, bạn phải thuộc các nhóm động từ chỉ đi kèm với V-ing, hoặc chỉ đi kèm với to-V, hoặc thay đổi ý nghĩa tùy theo dạng động từ.",
    importance: "Là chủ điểm xuất hiện với mật độ cực cao trong TOEIC Part 5 & 6.",
    formula: [
      "Subject + Verb + TO-VERB",
      "Subject + Verb + VERB-ING",
      "Preposition + VERB-ING",
      "To-Verb (Đứng đầu câu làm trạng ngữ chỉ mục đích)"
    ],
    usage: [
      {
        title: "Verbs followed by to-Infinitive (Động từ đi với to-V)",
        description: "Các động từ chỉ mong muốn, kế hoạch, quyết định.",
        signalWords: ["decide", "plan", "agree", "promise", "refuse", "hope", "manage", "fail", "intend"]
      },
      {
        title: "Verbs followed by Gerund (Động từ đi với V-ing)",
        description: "Các động từ chỉ sự trì hoãn, đề xuất, hoàn thành.",
        signalWords: ["avoid", "recommend", "suggest", "postpone", "delay", "mind", "enjoy", "consider", "finish"]
      }
    ],
    examples: [
      {
        english: "We decided to postpone the marketing launch.",
        vietnamese: "Chúng tôi đã quyết định trì hoãn việc khởi động tiếp thị.",
        explanation: "decide đi với to-V (to postpone). postpone đi với V-ing (launching)."
      },
      {
        english: "The consultant recommended upgrading our accounting database.",
        vietnamese: "Nhà tư vấn đề xuất nâng cấp cơ sở dữ liệu kế toán của chúng tôi.",
        explanation: "recommend đi kèm trực tiếp với danh động từ V-ing (upgrading)."
      },
      {
        english: "Before signing the agreement, please review the clauses carefully.",
        vietnamese: "Trước khi ký hợp đồng, vui lòng xem xét kỹ các điều khoản.",
        explanation: "Sau giới từ 'Before' bắt buộc dùng dạng V-ing (signing)."
      },
      {
        english: "To qualify for the discount, you must purchase at least three items.",
        vietnamese: "Để đủ điều kiện nhận giảm giá, bạn phải mua ít nhất ba mặt hàng.",
        explanation: "To-infinitive đứng đầu câu để diễn tả mục đích ('Để làm gì...')."
      },
      {
        english: "Our IT support team managed to resolve the network failure within an hour.",
        vietnamese: "Đội hỗ trợ CNTT của chúng tôi đã xoay sở giải quyết được sự cố mạng trong vòng một giờ.",
        explanation: "manage đi với to-infinitive."
      }
    ],
    tips: [
      "Học thuộc lòng các cấu trúc đặc biệt hay gặp trong TOEIC: look forward to + V-ing (trông đợi); be committed to + V-ing (cam kết); be used to + V-ing (quen với); contribute to + V-ing (đóng góp vào). Ở đây 'to' đóng vai trò giới từ nên phải dùng V-ing!",
      "Cấu trúc chỉ mục đích đứng đầu câu luôn là: 'To + Verb, Subject + Verb...'. Đừng nhầm lẫn chọn V-ing đứng đầu câu nếu vế sau nói về mục đích.",
      "Sau các giới từ (in, on, at, by, for, about, without, before, after...) + V-ing."
    ],
    commonMistakes: [
      "Dùng động từ nguyên mẫu sau giới từ 'to' trong các cụm từ cố định (ví dụ: 'I look forward to meet you' => Sai, phải là 'to meeting you').",
      "Nhầm lẫn ý nghĩa của 'stop to-V' (dừng lại để làm việc gì khác) và 'stop V-ing' (dừng hẳn việc đang làm)."
    ],
    quiz: [
      {
        question: "Management is considering ______ the corporate headquarters to a larger facility next year.",
        choices: ["relocate", "to relocate", "relocating", "relocation"],
        answer: "relocating",
        explanation: "Động từ 'consider' đi với V-ing => Chọn 'relocating'.",
        difficulty: "Easy"
      },
      {
        question: "______ for the free shipping option, customers must order items totaling over $50.",
        choices: ["Qualify", "Qualifying", "To qualify", "Qualified"],
        answer: "To qualify",
        explanation: "Đứng đầu câu chỉ mục đích ('Để đủ điều kiện nhận...') => Chọn 'To qualify'.",
        difficulty: "Medium"
      },
      {
        question: "We look forward to ______ our new regional partners at the upcoming business summit.",
        choices: ["meet", "meeting", "met", "be met"],
        answer: "meeting",
        explanation: "Cấu trúc 'look forward to + V-ing' => Chọn 'meeting'.",
        difficulty: "Easy"
      },
      {
        question: "The company failed ______ the safety standards, resulting in a heavy fine.",
        choices: ["meet", "to meet", "meeting", "met"],
        answer: "to meet",
        explanation: "Động từ 'fail' đi với to-infinitive => Chọn 'to meet' (thất bại/không làm được việc gì).",
        difficulty: "Easy"
      },
      {
        question: "Before ______ the marketing plan, the director wants to review the competitor analysis.",
        choices: ["finalize", "finalizing", "finalized", "to finalize"],
        answer: "finalizing",
        explanation: "Sau giới từ 'Before' cần danh động từ => Chọn 'finalizing'.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 15,
    title: "Passive Voice",
    description: "Thể bị động (Passive Voice) được dùng khi chủ thể thực hiện hành động không quan trọng hoặc không muốn nhắc tới, thay vào đó nhấn mạnh vào đối tượng chịu tác động. TOEIC cực kỳ ưa chuộng thể bị động.",
    importance: "Luôn xuất hiện từ 2-3 câu trong mỗi đề thi TOEIC Part 5 & 6.",
    formula: [
      "Subject (Bị động) + BE + V-3/ed (Quá khứ phân từ) + (by + Object)",
      "Modal Verb + BE + V-3/ed",
      "Have/Has + BEEN + V-3/ed",
      "Is/Are + BEING + V-3/ed"
    ],
    usage: [
      {
        title: "Action emphasis (Nhấn mạnh hành động/sự vật)",
        description: "Khi đối tượng chịu tác động được đưa lên làm chủ ngữ chính.",
        signalWords: ["by", "recently", "already", "scheduled to be"]
      }
    ],
    examples: [
      {
        english: "The new guidelines were established by the board of directors.",
        vietnamese: "Các hướng dẫn mới đã được thiết lập bởi ban giám đốc.",
        explanation: "were established là động từ bị động ở thì quá khứ đơn, chia theo chủ ngữ số nhiều 'guidelines'."
      },
      {
        english: "The financial reports are being audited by an external agency.",
        vietnamese: "Các báo cáo tài chính đang được kiểm toán bởi một cơ quan bên ngoài.",
        explanation: "are being audited là bị động của thì hiện tại tiếp diễn."
      },
      {
        english: "The contract has already been signed by both parties.",
        vietnamese: "Hợp đồng đã được ký kết bởi cả hai bên.",
        explanation: "has been signed là bị động ở thì hiện tại hoàn thành."
      },
      {
        english: "All security systems must be upgraded before the weekend.",
        vietnamese: "Tất cả các hệ thống bảo mật phải được nâng cấp trước cuối tuần.",
        explanation: "must be upgraded là bị động với động từ khuyết thiếu 'must'."
      },
      {
        english: "A press release will be issued tomorrow morning.",
        vietnamese: "Một bản thông cáo báo chí sẽ được đưa ra vào sáng mai.",
        explanation: "will be issued là bị động thì tương lai đơn."
      }
    ],
    tips: [
      "Mẹo làm bài phân biệt Chủ động vs. Bị động: Nhìn ngay sau khoảng trống. Nếu có cụm tân ngữ danh từ đứng sau => Chọn Chủ động. Nếu không có tân ngữ đứng sau (thường theo sau bởi giới từ 'by', 'to', 'for' hoặc trạng từ, hoặc dấu câu) => Cực kỳ ưu tiên chọn Bị động.",
      "Tuyệt đối không chia bị động cho các nội động từ (arrive, happen, occur, remain, rise, fall).",
      "Cấu trúc bị động đặc biệt với động từ nhận thức: 'It is expected/believed/reported that...' (Người ta mong đợi/tin rằng/báo cáo rằng...)."
    ],
    commonMistakes: [
      "Chọn động từ chủ động khi chủ ngữ là vật và không thể tự thực hiện hành động (ví dụ: 'The report wrote yesterday' => Sai, phải là 'The report was written yesterday').",
      "Quên trợ động từ 'be' hoặc phân từ 'been' trong cấu trúc bị động."
    ],
    quiz: [
      {
        question: "The contract for the building renovation ______ by the purchasing director last night.",
        choices: ["signed", "was signed", "has signed", "is signing"],
        answer: "was signed",
        explanation: "Chủ ngữ là 'The contract' (vật), không thể tự ký. Có thời gian 'last night' => Bị động ở quá khứ đơn => Chọn 'was signed'.",
        difficulty: "Easy"
      },
      {
        question: "All personal data ______ securely to protect client confidentiality.",
        choices: ["must store", "must be stored", "must storing", "must stored"],
        answer: "must be stored",
        explanation: "Chủ ngữ 'personal data' cần được lưu trữ => Bị động với động từ khuyết thiếu => Chọn 'must be stored'.",
        difficulty: "Easy"
      },
      {
        question: "Several changes to the corporate design ______ by the marketing team recently.",
        choices: ["have proposed", "have been proposed", "proposed", "are proposing"],
        answer: "have been proposed",
        explanation: "Có dấu hiệu 'recently' (hiện tại hoàn thành). Chủ ngữ 'Several changes' chịu tác động => Bị động hiện tại hoàn thành => Chọn 'have been proposed'.",
        difficulty: "Medium"
      },
      {
        question: "The final budget proposal ______ by the executive board at this very moment.",
        choices: ["is reviewing", "is being reviewed", "reviews", "has reviewed"],
        answer: "is being reviewed",
        explanation: "Có dấu hiệu 'at this very moment' (hiện tại tiếp diễn). Chủ ngữ 'The final budget proposal' nhận hành động => Bị động hiện tại tiếp diễn => Chọn 'is being reviewed'.",
        difficulty: "Medium"
      },
      {
        question: "Staff members are reminded that all safety protocols ______ strictly at the construction site.",
        choices: ["must observe", "must be observed", "observing", "observed"],
        answer: "must be observed",
        explanation: "Các quy trình an toàn cần được tuân thủ => Bị động khuyết thiếu => Chọn 'must be observed'.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 16,
    title: "Relative Clauses",
    description: "Mệnh đề quan hệ (Relative Clauses) bổ nghĩa cho danh từ đứng trước. TOEIC thường xuyên kiểm tra các đại từ quan hệ who, whom, which, that, whose và dạng rút gọn mệnh đề quan hệ (phân từ chủ động/bị động).",
    importance: "Cực kỳ quan trọng. Dạng rút gọn mệnh đề quan hệ là một trong những dạng câu hỏi khó và phân loại thí sinh nhiều nhất trong Part 5.",
    formula: [
      "Noun (người) + WHO + Verb",
      "Noun (người) + WHOM + Subject + Verb",
      "Noun (vật) + WHICH + Verb / Clause",
      "Noun + WHOSE + Noun (sở hữu)",
      "Rút gọn chủ động: Noun + V-ing",
      "Rút gọn bị động: Noun + V-3/ed"
    ],
    usage: [
      {
        title: "Relative Pronouns (Đại từ quan hệ)",
        description: "Thay thế cho danh từ làm chủ ngữ hoặc tân ngữ trong mệnh đề phụ.",
        signalWords: ["who", "whom", "which", "whose", "that"]
      },
      {
        title: "Reduced Relative Clauses (Rút gọn mệnh đề quan hệ)",
        description: "Lược bỏ đại từ quan hệ và động từ to be, giữ lại phân từ chủ động (V-ing) hoặc bị động (V3/ed).",
        signalWords: ["who is doing -> doing", "which was designed -> designed"]
      }
    ],
    examples: [
      {
        english: "The technician who repaired the server was very professional.",
        vietnamese: "Kỹ thuật viên người đã sửa chữa máy chủ rất chuyên nghiệp.",
        explanation: "who làm chủ ngữ thay thế cho danh từ chỉ người 'The technician'."
      },
      {
        english: "We hired a designer whose portfolio was highly impressive.",
        vietnamese: "Chúng tôi đã thuê một nhà thiết kế có danh mục hồ sơ rất ấn tượng.",
        explanation: "whose thể hiện sự sở hữu: hồ sơ của nhà thiết kế đó."
      },
      {
        english: "The report designed by our team received positive feedback.",
        vietnamese: "Bản báo cáo được thiết kế bởi nhóm chúng tôi đã nhận được phản hồi tích cực.",
        explanation: "Dạng rút gọn bị động: 'The report (which was) designed by...'"
      },
      {
        english: "Employees wishing to attend the seminar must register online.",
        vietnamese: "Những nhân viên muốn tham dự hội thảo phải đăng ký trực tuyến.",
        explanation: "Dạng rút gọn chủ động: 'Employees (who wish) wishing to...'"
      },
      {
        english: "This is the invoice which we received from the supplier yesterday.",
        vietnamese: "Đây là hóa đơn mà chúng tôi đã nhận từ nhà cung cấp ngày hôm qua.",
        explanation: "which làm tân ngữ thay cho danh từ chỉ vật 'the invoice'."
      }
    ],
    tips: [
      "Mẹo làm bài rút gọn mệnh đề quan hệ: Cấu trúc câu dạng 'S + [khoảng trống] + O + V(chính)...' => Động từ chính đã có ở sau, khoảng trống nằm trong mệnh đề phụ bổ nghĩa cho S. Chọn V-ing nếu S thực hiện hành động (chủ động), chọn V3/ed nếu S nhận tác động (bị động).",
      "Không dùng 'that' trong mệnh đề quan hệ không xác định (mệnh đề đứng sau dấu phẩy).",
      "Whose bắt buộc phải đi kèm với danh từ ngay sau nó: 'Noun + whose + Noun'."
    ],
    commonMistakes: [
      "Dùng động từ chia thì làm rút gọn mệnh đề quan hệ (ví dụ: 'The employees attended the meeting yesterday complained' => Sai động từ kép, phải dùng 'attending' hoặc 'who attended').",
      "Nhầm lẫn 'who' (chủ ngữ) và 'whom' (tân ngữ)."
    ],
    quiz: [
      {
        question: "The marketing strategist ______ we hired last month has already improved our campaign performance.",
        choices: ["who", "whom", "which", "whose"],
        answer: "whom",
        explanation: "Bổ nghĩa cho danh từ chỉ người 'strategist', phía sau là mệnh đề 'we hired' => Cần đại từ quan hệ đóng vai trò tân ngữ => Chọn 'whom'.",
        difficulty: "Medium"
      },
      {
        question: "Anyone ______ to register for the upcoming training sessions should contact the HR coordinator.",
        choices: ["wish", "wishing", "wishes", "wished"],
        answer: "wishing",
        explanation: "Rút gọn mệnh đề quan hệ dạng chủ động bổ nghĩa cho chủ ngữ 'Anyone' => 'Anyone (who wishes) wishing to register...'. Động từ chính là 'should contact'.",
        difficulty: "Hard"
      },
      {
        question: "The guidelines ______ by the safety inspector must be implemented immediately.",
        choices: ["issued", "issuing", "issue", "issues"],
        answer: "issued",
        explanation: "Rút gọn mệnh đề quan hệ dạng bị động bổ nghĩa cho 'guidelines' => 'The guidelines (which were) issued by...'.",
        difficulty: "Hard"
      },
      {
        question: "The corporation, ______ stock prices soared last week, announced a new acquisition.",
        choices: ["whose", "who", "which", "that"],
        answer: "whose",
        explanation: "Bổ nghĩa cho sự sở hữu danh từ 'stock prices' (giá cổ phiếu của tập đoàn đó) => Chọn 'whose'.",
        difficulty: "Medium"
      },
      {
        question: "The documents ______ you requested from the archive department are on your desk.",
        choices: ["who", "which", "whose", "whom"],
        answer: "which",
        explanation: "Bổ nghĩa cho danh từ chỉ vật 'documents' làm tân ngữ cho 'requested' => Chọn 'which'.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 17,
    title: "Comparisons",
    description: "So sánh (Comparisons) bao gồm so sánh bằng, so sánh hơn, và so sánh nhất của tính từ và trạng từ. TOEIC hay ra đề kiểm tra việc chọn từ chỉ mức độ đi kèm so sánh hoặc phân biệt tính từ ngắn/dài.",
    importance: "Mật độ xuất hiện 1 câu trong hầu hết các đề thi Part 5.",
    formula: [
      "Comparative (Tính từ ngắn): S + Verb + Adj-er + than",
      "Comparative (Tính từ dài): S + Verb + more + Adj + than",
      "Superlative (Ngắn): S + Verb + the + Adj-est",
      "Superlative (Dài): S + Verb + the + most + Adj",
      "Equality: S + Verb + as + Adj/Adv + as"
    ],
    usage: [
      {
        title: "Comparative (So sánh hơn)",
        description: "So sánh đặc điểm giữa hai đối tượng.",
        signalWords: ["than", "much", "far", "significantly", "slightly", "even"]
      },
      {
        title: "Superlative (So sánh nhất)",
        description: "So sánh một đối tượng với tất cả các đối tượng còn lại trong nhóm.",
        signalWords: ["the", "of all", "ever", "in the world", "in the department"]
      }
    ],
    examples: [
      {
        english: "The new processor is significantly faster than the previous model.",
        vietnamese: "Bộ vi xử lý mới nhanh hơn đáng kể so với mẫu trước đó.",
        explanation: "faster là so sánh hơn của tính từ ngắn 'fast'. significantly là trạng từ bổ nghĩa nhấn mạnh so sánh hơn."
      },
      {
        english: "This is the most efficient software we have ever used.",
        vietnamese: "Đây là phần mềm hiệu quả nhất mà chúng tôi từng sử dụng.",
        explanation: "the most efficient là so sánh nhất của tính từ dài 'efficient'."
      },
      {
        english: "The sales figures for this quarter are as high as those of last year.",
        vietnamese: "Số liệu doanh thu của quý này cao bằng số liệu của năm ngoái.",
        explanation: "Cấu trúc so sánh bằng 'as + adjective + as'."
      },
      {
        english: "We need to analyze the market trends more carefully.",
        vietnamese: "Chúng tôi cần phân tích các xu hướng thị trường một cách cẩn thận hơn.",
        explanation: "more carefully là so sánh hơn của trạng từ 'carefully'."
      },
      {
        english: "Of all the applicants, Ms. Davis is the most qualified.",
        vietnamese: "Trong số tất cả các ứng viên, cô Davis là người có trình độ chuyên môn cao nhất.",
        explanation: "Cấu trúc so sánh nhất đi kèm với cụm từ 'Of all the...'."
      }
    ],
    tips: [
      "Mẹo làm bài nhanh: Nếu phía sau khoảng trống có 'than' => Chắc chắn điền So sánh hơn. Nếu phía trước có 'the' và không có 'than' phía sau => Ưu tiên điền So sánh nhất.",
      "Ghi nhớ các trạng từ chuyên dùng để nhấn mạnh so sánh hơn, rất hay hỏi trong TOEIC: much, far, significantly, substantially, slightly, even. (Tuyệt đối không dùng 'very' trước so sánh hơn).",
      "Chú ý các tính từ/trạng từ biến đổi đặc biệt: good/well -> better -> best; bad/badly -> worse -> worst; far -> farther/further -> farthest/furthest."
    ],
    commonMistakes: [
      "Dùng song song cả đuôi -er và 'more' (ví dụ viết: 'more faster' => Sai, chỉ viết 'faster').",
      "Quên mạo từ 'the' trước so sánh nhất."
    ],
    quiz: [
      {
        question: "The marketing director is looking for a ______ way to reach younger demographics.",
        choices: ["effect", "effective", "more effective", "most effective"],
        answer: "more effective",
        explanation: "Cần tính từ so sánh hơn để bổ nghĩa cho danh từ 'way' (so sánh cách làm mới với các cách hiện tại) => Chọn 'more effective'.",
        difficulty: "Easy"
      },
      {
        question: "Ms. Cho designs websites ______ than her colleagues in the creative department.",
        choices: ["creatively", "more creatively", "creative", "most creatively"],
        answer: "more creatively",
        explanation: "Có từ 'than' và bổ nghĩa cho động từ 'designs' => Cần trạng từ ở dạng so sánh hơn => Chọn 'more creatively'.",
        difficulty: "Easy"
      },
      {
        question: "The new office building in Hanoi is the ______ structure in the city.",
        choices: ["tall", "taller", "tallest", "most tall"],
        answer: "tallest",
        explanation: "Có mạo từ 'the' phía trước và so sánh trong phạm vi toàn thành phố => Dùng so sánh nhất của tính từ ngắn => Chọn 'tallest'.",
        difficulty: "Easy"
      },
      {
        question: "The shipping costs for the international delivery were ______ higher than we expected.",
        choices: ["very", "too", "much", "more"],
        answer: "much",
        explanation: "Có tính từ so sánh hơn 'higher'. Trạng từ dùng để nhấn mạnh so sánh hơn là 'much'. 'very' không đứng trước so sánh hơn.",
        difficulty: "Medium"
      },
      {
        question: "Our customer service rating this month is as ______ as it was during the holiday peak season.",
        choices: ["high", "higher", "highest", "highly"],
        answer: "high",
        explanation: "Cấu trúc so sánh bằng 'as + Adj/Adv + as' => Chọn tính từ dạng nguyên bản 'high' để bổ nghĩa cho danh từ rating.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 18,
    title: "Conditionals",
    description: "Câu điều kiện (Conditionals) mô tả giả định và kết quả có thể xảy ra. Trong TOEIC, bạn cần nắm vững cấu trúc của Câu điều kiện loại 1, loại 2, loại 3 và đặc biệt là hiện tượng Đảo ngữ câu điều kiện.",
    importance: "Mật độ ra đề trung bình nhưng câu hỏi đảo ngữ câu điều kiện lại là câu ăn điểm 800+.",
    formula: [
      "Type 1 (Có thật ở HT/TL): If + S + V(hiện tại đơn), S + will/can/should + V(nguyên mẫu)",
      "Type 2 (Không thật ở HT): If + S + V2/ed (were), S + would/could + V(nguyên mẫu)",
      "Type 3 (Không thật ở QK): If + S + had + V-3/ed, S + would/could + have + V-3/ed",
      "Đảo ngữ loại 1: Should + S + V(nguyên mẫu), S + will/can + V",
      "Đảo ngữ loại 2: Were + S + to-V (hoặc Were + S + Noun/Adj), S + would/could + V",
      "Đảo ngữ loại 3: Had + S + V-3/ed, S + would/could + have + V-3/ed"
    ],
    usage: [
      {
        title: "Type 1 / Real Conditionals",
        description: "Giả định tình huống thực tế có thể xảy ra trong công việc.",
        signalWords: ["if", "provided that", "providing that", "as long as", "in case", "unless"]
      },
      {
        title: "Type 3 / Unreal Past Conditionals",
        description: "Tiếc nuối hoặc giả định trái ngược quá khứ.",
        signalWords: ["yesterday", "last year", "would have been"]
      }
    ],
    examples: [
      {
        english: "If you submit the invoice today, the finance team will process it tomorrow.",
        vietnamese: "Nếu bạn nộp hóa đơn hôm nay, nhóm tài chính sẽ xử lý nó vào ngày mai.",
        explanation: "Câu điều kiện loại 1 diễn tả sự việc hoàn toàn có thể xảy ra."
      },
      {
        english: "Should you require further assistance, please do not hesitate to contact us.",
        vietnamese: "Nếu bạn yêu cầu trợ giúp thêm, xin vui lòng liên hệ với chúng tôi.",
        explanation: "Dạng đảo ngữ câu điều kiện loại 1, thay 'If you require' bằng 'Should you require'."
      },
      {
        english: "Had the IT department backed up the database, we would not have lost the client records.",
        vietnamese: "Nếu bộ phận CNTT sao lưu cơ sở dữ liệu, chúng tôi đã không mất hồ sơ khách hàng.",
        explanation: "Dạng đảo ngữ câu điều kiện loại 3, thay 'If the IT department had backed up' bằng 'Had the IT department backed up'."
      },
      {
        english: "The company would expand its operations if it had more liquid capital.",
        vietnamese: "Công ty sẽ mở rộng hoạt động của mình nếu nó có nhiều vốn lưu động hơn.",
        explanation: "Câu điều kiện loại 2, giả định trái ngược với hiện thực là công ty không có nhiều vốn."
      },
      {
        english: "Unless we receive the shipment by tomorrow, we will cancel the order.",
        vietnamese: "Nếu chúng tôi không nhận được lô hàng trước ngày mai, chúng tôi sẽ hủy đơn hàng.",
        explanation: "Unless mang nghĩa phủ định 'Nếu... không' (If ... not)."
      }
    ],
    tips: [
      "Mẹo nhận biết đảo ngữ: Nếu đầu câu có khoảng trống, phía sau là một mệnh đề hoàn chỉnh, và đáp án có chứa 'Should', 'Were', 'Had' => Nghĩ ngay đến đảo ngữ câu điều kiện.",
      "Công thức đảo ngữ loại 3 ăn điểm: Had + Subject + V3/ed, Subject + would/could + have + V3/ed. Học thuộc cấu trúc song hành này.",
      "Thay thế cho 'If': provided that, providing that, as long as (với điều kiện là), in case (trong trường hợp), unless (trừ khi / nếu không)."
    ],
    commonMistakes: [
      "Dùng 'will' trong mệnh đề chứa If (ví dụ: 'If we will launch the product, we will win' => Sai, phải dùng hiện tại đơn 'If we launch...').",
      "Nhầm lẫn cách dùng 'unless' (ví dụ dùng 'unless we don't start' => Sai phủ định kép, phải là 'unless we start')."
    ],
    quiz: [
      {
        question: "______ you experience any technical difficulties with the software, please contact the IT help desk.",
        choices: ["Should", "Had", "Were", "If you"],
        answer: "Should",
        explanation: "Dạng đảo ngữ câu điều kiện loại 1. Thay thế 'If you experience' bằng 'Should you experience' + động từ nguyên mẫu 'experience'.",
        difficulty: "Medium"
      },
      {
        question: "Had we known about the market downturn, we ______ the production of luxury models.",
        choices: ["will decrease", "decreased", "would have decreased", "would decrease"],
        answer: "would have decreased",
        explanation: "Mệnh đề phụ bắt đầu bằng đảo ngữ loại 3 'Had we known' => Mệnh đề chính phải có dạng 'would have + V3' => Chọn 'would have decreased'.",
        difficulty: "Medium"
      },
      {
        question: "The director ______ the merger proposal if she believed it posed high financial risks.",
        choices: ["will reject", "would reject", "rejected", "rejects"],
        answer: "would reject",
        explanation: "Mệnh đề chứa 'if' chia ở quá khứ đơn 'believed' (loại 2) => Mệnh đề chính dùng 'would + V(nguyên mẫu)' => Chọn 'would reject'.",
        difficulty: "Easy"
      },
      {
        question: "______ we receive the signed contract by Friday afternoon, we will postpone the start date.",
        choices: ["Unless", "In case", "Providing", "If"],
        answer: "Unless",
        explanation: "Ý nghĩa câu: 'Nếu chúng tôi không nhận được...' => Chọn 'Unless' (Trừ khi).",
        difficulty: "Medium"
      },
      {
        question: "As long as the budget ______ approved, the construction work can begin next week.",
        choices: ["is", "be", "will be", "was"],
        answer: "is",
        explanation: "Cấu trúc điều kiện loại 1 với cụm từ thay thế 'As long as'. Mệnh đề phụ dùng hiện tại đơn bị động => Chọn 'is'.",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 19,
    title: "Reported Speech",
    description: "Câu gián tiếp (Reported Speech) dùng để tường thuật lại lời nói của người khác. Trong TOEIC, câu gián tiếp thường xuất hiện dưới dạng email tường thuật cuộc họp hoặc biên bản ghi nhớ, đòi hỏi bạn lùi thì phù hợp.",
    importance: "Mức độ ra đề thấp nhưng thường tích hợp vào các câu hỏi chia thì ở các bài đọc Part 6 & 7.",
    formula: [
      "Direct: S + said, 'I will write the report today.'",
      "Reported: S + said (that) he would write the report that day."
    ],
    usage: [
      {
        title: "Tense Backshifting (Lùi thì)",
        description: "Khi động từ tường thuật ở quá khứ (said, told, announced), động từ trong câu gián tiếp lùi một thì.",
        signalWords: ["will -> would", "can -> could", "present simple -> past simple", "present perfect -> past perfect"]
      }
    ],
    examples: [
      {
        english: "The manager announced that the company would implement a new policy.",
        vietnamese: "Người quản lý thông báo rằng công ty sẽ thực hiện một chính sách mới.",
        explanation: "Động từ 'announced' ở quá khứ nên 'will' trong câu gốc lùi thành 'would'."
      },
      {
        english: "She told me she had already sent the invoice to the client.",
        vietnamese: "Cô ấy nói với tôi rằng cô ấy đã gửi hóa đơn cho khách hàng.",
        explanation: "Câu gốc chia ở hiện tại hoàn thành hoặc quá khứ đơn, khi tường thuật lùi thành quá khứ hoàn thành 'had sent'."
      },
      {
        english: "The representative asked whether the shipment was on its way.",
        vietnamese: "Đại diện hỏi liệu lô hàng có đang trên đường vận chuyển hay không.",
        explanation: "Tường thuật câu hỏi Yes/No sử dụng 'whether' và lùi động từ 'is' thành 'was'."
      },
      {
        english: "The IT coordinator said that the server was currently under maintenance.",
        vietnamese: "Điều phối viên CNTT cho biết máy chủ hiện đang được bảo trì.",
        explanation: "Động từ gốc ở hiện tại đơn lùi thành quá khứ đơn 'was'."
      },
      {
        english: "Mr. Cho confirmed that the audit would take place next week.",
        vietnamese: "Ông Cho xác nhận rằng cuộc kiểm toán sẽ diễn ra vào tuần tới.",
        explanation: "Động từ tường thuật 'confirmed' yêu cầu mệnh đề sau chia ở dạng quá khứ trong tương lai 'would'."
      }
    ],
    tips: [
      "Phân biệt 'say' và 'tell': 'say' đi trực tiếp với mệnh đề (say that...), còn 'tell' bắt buộc phải có tân ngữ chỉ người đi kèm trước mệnh đề (tell someone that...).",
      "Chú ý đổi trạng ngữ chỉ thời gian và nơi chốn: tomorrow -> the next day; yesterday -> the day before; now -> then; here -> there.",
      "Nếu động từ tường thuật chia ở thì hiện tại (says, announces...) thì KHÔNG thực hiện lùi thì của mệnh đề gián tiếp."
    ],
    commonMistakes: [
      "Dùng 'tell' không có tân ngữ (ví dụ viết: 'He told that the project was complete' => Sai, phải là 'He said that...' hoặc 'He told us that...').",
      "Quên lùi thì của động từ khi động từ tường thuật chia ở quá khứ."
    ],
    quiz: [
      {
        question: "The project coordinator announced that the system upgrades ______ completed by the end of the week.",
        choices: ["will be", "would be", "are", "have been"],
        answer: "would be",
        explanation: "Động từ tường thuật 'announced' ở quá khứ đơn => Cần lùi thì tương lai 'will be' thành 'would be'.",
        difficulty: "Easy"
      },
      {
        question: "Ms. Lopez ______ the executive board that the sales target had been exceeded.",
        choices: ["said", "told", "announced", "explained"],
        answer: "told",
        explanation: "Có cụm tân ngữ chỉ người phía sau 'the executive board' => Động từ thích hợp duy nhất là 'told' (tell someone that...).",
        difficulty: "Medium"
      },
      {
        question: "The technician explained that the network outage ______ caused by a hardware failure.",
        choices: ["had been", "has been", "is", "will be"],
        answer: "had been",
        explanation: "Tường thuật một sự việc xảy ra trước thời điểm nói => Lùi thì thành quá khứ hoàn thành bị động 'had been'.",
        difficulty: "Medium"
      },
      {
        question: "The client asked ______ the shipment could be expedited to arrive by Tuesday.",
        choices: ["that", "if", "what", "which"],
        answer: "if",
        explanation: "Tường thuật câu hỏi Yes/No sử dụng liên từ 'if' hoặc 'whether' => Chọn 'if'.",
        difficulty: "Easy"
      },
      {
        question: "The director stated that the research team ______ working on the market analysis.",
        choices: ["is currently", "was currently", "will currently", "has currently"],
        answer: "was currently",
        explanation: "Động từ tường thuật 'stated' ở quá khứ => Động từ phụ phải chia ở quá khứ tiếp diễn 'was currently' (lùi từ 'is currently').",
        difficulty: "Medium"
      }
    ]
  },
  {
    id: 20,
    title: "Countable & Uncountable Nouns",
    description: "Phân biệt Danh từ đếm được và Danh từ không đếm được. Đây là chủ điểm ngữ pháp rất căn bản nhưng lại là cái bẫy chết người trong TOEIC vì có nhiều từ tiếng Việt đếm được nhưng tiếng Anh lại không đếm được.",
    importance: "Đặc biệt hữu ích khi làm các câu hỏi ngữ pháp liên quan đến sự lựa chọn mạo từ, từ chỉ lượng hoặc động từ phù hợp.",
    formula: [
      "Countable Nouns: a/an + Noun (singular) hoặc Noun-s/es (plural)",
      "Uncountable Nouns: NO mạo từ a/an, NO dạng số nhiều -s/es"
    ],
    usage: [
      {
        title: "Uncountable TOEIC Nouns (Danh từ không đếm được phổ biến)",
        description: "Các danh từ chỉ thông tin, đồ đạc, lời khuyên, trang thiết bị trong văn phòng.",
        signalWords: ["information", "equipment", "luggage", "baggage", "advice", "furniture", "machinery", "advertising", "merchandise"]
      }
    ],
    examples: [
      {
        english: "The company purchased new office equipment last month.",
        vietnamese: "Công ty đã mua thiết bị văn phòng mới vào tháng trước.",
        explanation: "equipment là danh từ không đếm được, không dùng 'an equipment' hoặc 'equipments'."
      },
      {
        english: "We need more information before we can make a decision.",
        vietnamese: "Chúng tôi cần thêm thông tin trước khi chúng tôi có thể đưa ra quyết định.",
        explanation: "information là danh từ không đếm được, dùng dạng nguyên bản."
      },
      {
        english: "The consultant gave us some useful advice on marketing.",
        vietnamese: "Nhà tư vấn đã cho chúng tôi một vài lời khuyên hữu ích về tiếp thị.",
        explanation: "advice là danh từ không đếm được. Không bao giờ viết 'advices'."
      },
      {
        english: "All merchandise must be inspected before being placed on the shelves.",
        vietnamese: "Tất cả hàng hóa phải được kiểm tra trước khi đặt lên kệ.",
        explanation: "merchandise là danh từ không đếm được, đi kèm với động từ số ít 'is/must be'."
      },
      {
        english: "Office furniture is scheduled to arrive tomorrow.",
        vietnamese: "Đồ nội thất văn phòng dự kiến sẽ đến vào ngày mai.",
        explanation: "furniture là danh từ không đếm được, đi với động từ chia số ít 'is'."
      }
    ],
    tips: [
      "Học thuộc danh sách 'Đặc sản không đếm được' của TOEIC: information, equipment, machinery, baggage, luggage, furniture, advice, merchandise, advertising (quảng cáo nói chung, khác với advertisement là đếm được).",
      "Các từ chỉ lượng đi với danh từ không đếm được: much, little, a little, less, a great deal of, an amount of.",
      "Để đếm danh từ không đếm được, người ta dùng cụm: 'a piece of' (ví dụ: a piece of advice, a piece of equipment)."
    ],
    commonMistakes: [
      "Thêm số nhiều cho danh từ không đếm được (ví dụ viết: 'equipments', 'informations' => Sai hoàn toàn).",
      "Dùng mạo từ 'a/an' trực tiếp đứng trước danh từ không đếm được."
    ],
    quiz: [
      {
        question: "The customer service representative provided us with ______ regarding the shipping options.",
        choices: ["an information", "informations", "information", "some informations"],
        answer: "information",
        explanation: "'information' là danh từ không đếm được => Không dùng mạo từ 'an' và không có dạng số nhiều => Chọn 'information'.",
        difficulty: "Easy"
      },
      {
        question: "Several pieces of office ______ were damaged during the relocation process.",
        choices: ["furniture", "furnitures", "furnishing", "furnishings"],
        answer: "furniture",
        explanation: "'furniture' là danh từ không đếm được, để đếm số nhiều dùng cụm 'pieces of furniture' => Chọn 'furniture'.",
        difficulty: "Medium"
      },
      {
        question: "The supervisor gave the new employees some valuable ______ during their first week.",
        choices: ["advices", "advice", "an advice", "advising"],
        answer: "advice",
        explanation: "'advice' là danh từ không đếm được => Chọn 'advice'.",
        difficulty: "Easy"
      },
      {
        question: "Our warehouse has received a large shipment of new ______ from the manufacturer.",
        choices: ["merchandise", "merchandises", "item", "product"],
        answer: "merchandise",
        explanation: "'merchandise' (hàng hóa) là danh từ không đếm được, phù hợp với ngữ cảnh 'a large shipment of...'. 'item' và 'product' ở dạng số ít đếm được, không đi sau 'a large shipment of' mà không có mạo từ/số nhiều.",
        difficulty: "Medium"
      },
      {
        question: "The factory has upgraded its ______ to increase production capacity.",
        choices: ["machinery", "machineries", "machine", "engines"],
        answer: "machinery",
        explanation: "'machinery' (máy móc hệ thống) là danh từ không đếm được. 'machine' và 'engine' là danh từ đếm được, nếu muốn dùng phải có dạng số nhiều hoặc mạo từ.",
        difficulty: "Hard"
      }
    ]
  },
  {
    id: 21,
    title: "Parallel Structure",
    description: "Cấu trúc song hành (Parallel Structure) yêu cầu các thành phần có cùng chức năng ngữ pháp trong câu khi liên kết bởi các liên từ đẳng lập (and, or, but) phải có cùng định dạng (cùng danh từ, cùng động từ, cùng tính từ...).",
    importance: "Rất hay gặp trong Part 5 & 6 dưới dạng chọn từ loại phù hợp trong một chuỗi liệt kê.",
    formula: [
      "A, B, and C (A, B, C phải cùng loại từ/định dạng)",
      "Both A and B (A và B song hành)",
      "Either A or B (A và B song hành)",
      "Not only A but also B (A và B song hành)"
    ],
    usage: [
      {
        title: "Coordinate Conjunctions (Liên từ đẳng lập)",
        description: "Kết nối các yếu tố có tầm quan trọng tương đương.",
        signalWords: ["and", "or", "but", "as well as", "rather than"]
      }
    ],
    examples: [
      {
        english: "The job candidate is professional, creative, and highly motivated.",
        vietnamese: "Ứng viên xin việc chuyên nghiệp, sáng tạo và có động lực cao.",
        explanation: "Các từ liệt kê đều là tính từ: professional (Adj), creative (Adj), motivated (Adj)."
      },
      {
        english: "The software enables users to create documents, edit files, and share data.",
        vietnamese: "Phần mềm cho phép người dùng tạo tài liệu, chỉnh sửa tệp và chia sẻ dữ liệu.",
        explanation: "Các cụm động từ nguyên mẫu song hành: create (Verb), edit (Verb), share (Verb)."
      },
      {
        english: "Ms. Patel is responsible for analyzing market trends, preparing budgets, and presenting reports.",
        vietnamese: "Cô Patel chịu trách nhiệm phân tích xu hướng thị trường, chuẩn bị ngân sách và trình bày báo cáo.",
        explanation: "Các danh động từ song hành sau giới từ 'for': analyzing (V-ing), preparing (V-ing), presenting (V-ing)."
      },
      {
        english: "The marketing plan focuses not only on social media advertising but also on email campaigns.",
        vietnamese: "Kế hoạch tiếp thị không chỉ tập trung vào quảng cáo mạng xã hội mà còn vào chiến dịch email.",
        explanation: "Cụm giới từ song hành: 'on social media...' và 'on email...'"
      },
      {
        english: "Our new manager is known for her decisiveness, integrity, and enthusiasm.",
        vietnamese: "Quản lý mới của chúng tôi nổi tiếng vì sự quyết đoán, tính chính trực và lòng nhiệt tình.",
        explanation: "Các danh từ song hành: decisiveness (Noun), integrity (Noun), enthusiasm (Noun)."
      }
    ],
    tips: [
      "Mẹo làm bài cực nhanh: Xác định liên từ 'and', 'or', 'but'. Nhìn các từ loại ở các vế trước dấu phẩy. Nếu tất cả đều là V-ing => Khoảng trống cần điền chắc chắn là V-ing. Nếu tất cả là Tính từ => Khoảng trống điền Tính từ.",
      "Cấu trúc song hành áp dụng cho cả cụm từ và mệnh đề, không chỉ từ đơn lẻ.",
      "Chú ý các cặp liên từ 'not only... but also...', 'both... and...': từ đứng sau 'not only' phải có cùng loại từ với từ đứng sau 'but also'."
    ],
    commonMistakes: [
      "Trộn lẫn danh động từ và động từ nguyên mẫu trong chuỗi liệt kê (ví dụ: 'He likes running, swimming, and to drive' => Sai, phải là 'driving').",
      "Trộn lẫn danh từ và tính từ (ví dụ: 'The seminar was informative, interesting, and a success' => Không song hành, nên viết 'successful')."
    ],
    quiz: [
      {
        question: "The orientation program for new hires covers company history, security protocols, and ______.",
        choices: ["benefit options", "to option benefits", "optioning benefits", "beneficial"],
        answer: "benefit options",
        explanation: "Các thành phần trước dấu phẩy là danh từ/cụm danh từ ('company history', 'security protocols') => Khoảng trống cần điền cụm danh từ => Chọn 'benefit options' (các lựa chọn phúc lợi).",
        difficulty: "Easy"
      },
      {
        question: "Ms. Cho's duties include updating the corporate database, organizing client files, and ______ meetings.",
        choices: ["schedule", "scheduling", "to schedule", "schedules"],
        answer: "scheduling",
        explanation: "Các động từ trước đó đều chia ở dạng V-ing ('updating', 'organizing') => Động từ liệt kê cuối cùng phải là 'scheduling' để song hành.",
        difficulty: "Easy"
      },
      {
        question: "The new workspace design is not only visually appealing but also ______ functional.",
        choices: ["high", "height", "highly", "highness"],
        answer: "highly",
        explanation: "Vế trước có trạng từ + tính từ 'visually appealing'. Vế sau có tính từ 'functional' => Cần trạng từ song hành đứng trước bổ nghĩa => Chọn 'highly'.",
        difficulty: "Medium"
      },
      {
        question: "To improve product quality, the factory decided to update its machinery, retrain workers, and ______ strict inspections.",
        choices: ["introduce", "introducing", "introduced", "introduces"],
        answer: "introduce",
        explanation: "Chuỗi động từ nguyên mẫu đứng sau cấu trúc 'to' => 'to update...', '(to) retrain...', and '(to) introduce...' => Chọn 'introduce'.",
        difficulty: "Medium"
      },
      {
        question: "We seek a candidate who is highly organized, detail-oriented, and ______ communicative.",
        choices: ["excellent", "excellence", "excellently", "excellencies"],
        answer: "excellently",
        explanation: "Cấu trúc song hành các cụm tính từ: 'highly organized' (Adv + Adj), 'detail-oriented' (Adj), và 'excellently communicative' (Adv + Adj) => Chọn trạng từ 'excellently'.",
        difficulty: "Hard"
      }
    ]
  },
  {
    id: 22,
    title: "Word Forms",
    description: "Cấu trúc Biến thể của Từ (Word Forms). Dạng bài này yêu cầu bạn chọn đúng hậu tố (suffix) để tạo thành danh từ, tính từ, động từ, hay trạng từ phù hợp dựa trên ngữ cảnh ngữ pháp của câu hỏi.",
    importance: "Chiếm số lượng câu hỏi nhiều nhất trong bài thi TOEIC Part 5 (khoảng 35%).",
    formula: [
      "Suffixes of Nouns: -tion, -sion, -ment, -ness, -ity, -ance, -ence, -er, -or, -ist",
      "Suffixes of Adjectives: -ful, -less, -al, -ive, -able, -ible, -ous, -ent, -ant",
      "Suffixes of Verbs: -ize, -ify, -en, -ate",
      "Suffixes of Adverbs: -ly"
    ],
    usage: [
      {
        title: "Suffix Recognition (Nhận diện hậu tố)",
        description: "Xác định loại từ dựa trên cấu trúc đuôi của từ.",
        signalWords: ["-tion = noun", "-ive = adjective", "-ly = adverb", "-ize = verb"]
      }
    ],
    examples: [
      {
        english: "The board announced the creation of a new international branch.",
        vietnamese: "Ban giám đốc đã thông báo thành lập một chi nhánh quốc tế mới.",
        explanation: "creation có đuôi -tion, là danh từ đóng vai trò tân ngữ."
      },
      {
        english: "Our design team created an innovative marketing solution.",
        vietnamese: "Nhóm thiết kế của chúng tôi đã tạo ra một giải pháp tiếp thị sáng tạo.",
        explanation: "innovative có đuôi -ive, là tính từ bổ nghĩa cho danh từ solution."
      },
      {
        english: "We need to simplify the online registration process.",
        vietnamese: "Chúng tôi cần đơn giản hóa quy trình đăng ký trực tuyến.",
        explanation: "simplify có đuôi -ify, là động từ nguyên mẫu đứng sau 'need to'."
      },
      {
        english: "The technician checked the system parameters thoroughly.",
        vietnamese: "Kỹ thuật viên đã kiểm tra kỹ lưỡng các thông số hệ thống.",
        explanation: "thoroughly có đuôi -ly, là trạng từ bổ nghĩa cho động từ checked."
      },
      {
        english: "The software upgrade will significantly improve database performance.",
        vietnamese: "Bản nâng cấp phần mềm sẽ cải thiện đáng kể hiệu suất cơ sở dữ liệu.",
        explanation: "significantly là trạng từ bổ nghĩa đứng trước động từ chính improve."
      }
    ],
    tips: [
      "Mẹo làm bài: Nếu bạn không biết nghĩa của từ, hãy dựa vào hậu tố (đuôi) để đoán từ loại. Loại bỏ đuôi -ly của trạng từ, bạn sẽ thu được tính từ gốc.",
      "Học các bẫy đuôi: chuyên gia, đại diện, đề xuất (-al, -ive là danh từ: proposal, representative).",
      "Luôn tìm động từ chính trước để xem câu đã đầy đủ thành phần cốt lõi chưa."
    ],
    commonMistakes: [
      "Nhầm lẫn trạng từ có đuôi -ly với tính từ có đuôi -ly (ví dụ: friendly, costly, timely, orderly là TÍNH TỪ, không phải trạng từ).",
      "Chọn sai danh từ chỉ người khi ngữ cảnh cần danh từ chỉ vật."
    ],
    quiz: [
      {
        question: "Ms. Foster handles all confidential client data ______ to ensure absolute privacy.",
        choices: ["profession", "professional", "professionally", "professionalism"],
        answer: "professionally",
        explanation: "Cần trạng từ bổ nghĩa cho động từ 'handles' => Chọn 'professionally'.",
        difficulty: "Easy"
      },
      {
        question: "The sudden ______ of the key financial planner surprised the entire project team.",
        choices: ["depart", "departure", "departed", "departing"],
        answer: "departure",
        explanation: "Đứng sau tính từ 'sudden' và trước giới từ 'of' cần một danh từ chỉ sự vật => Chọn 'departure' (sự ra đi/nghỉ việc).",
        difficulty: "Medium"
      },
      {
        question: "We need to find a ______ supplier of raw materials to stabilize our production costs.",
        choices: ["rely", "reliable", "reliably", "reliability"],
        answer: "reliable",
        explanation: "Đứng trước danh từ 'supplier' để bổ nghĩa => Cần tính từ 'reliable' (đáng tin cậy).",
        difficulty: "Easy"
      },
      {
        question: "The upgrade to our corporate website will ______ the checkout process for customers.",
        choices: ["simple", "simplify", "simplification", "simply"],
        answer: "simplify",
        explanation: "Đứng sau trợ động từ tương lai 'will' và trước tân ngữ 'the checkout process' => Cần động từ nguyên mẫu => Chọn 'simplify'.",
        difficulty: "Medium"
      },
      {
        question: "The board members deemed the proposed expansion strategy highly ______.",
        choices: ["risky", "risk", "riskily", "riskiness"],
        answer: "risky",
        explanation: "Cấu trúc 'deem + O + Adj' kết hợp với trạng từ bổ nghĩa 'highly' => Cần tính từ 'risky' (đầy rủi ro).",
        difficulty: "Hard"
      }
    ]
  },
  {
    id: 23,
    title: "Common TOEIC Grammar Patterns",
    description: "Các cấu trúc Ngữ pháp TOEIC thường gặp (Common TOEIC Grammar Patterns) tập hợp các công thức giả định, cấu trúc nhấn mạnh, thể giả định (subjunctive mood) và các cụm từ đặc trưng chỉ có trong đề thi TOEIC.",
    importance: "Nắm vững các cấu trúc này giúp bạn giải quyết các câu hỏi khó nhất trong bài thi (mục tiêu 800+).",
    formula: [
      "Subjunctive: S1 + recommend/suggest/request + that + S2 + VERB (nguyên mẫu không chia)",
      "Hardly/Scarcely + had + S + V-3/ed + when + S + V(quá khứ đơn)",
      "It is imperative/essential/important + that + S + VERB (nguyên mẫu)"
    ],
    usage: [
      {
        title: "Subjunctive Mood (Thể giả định)",
        description: "Dùng để diễn tả yêu cầu, đề nghị, khuyên bảo mang tính chất bắt buộc.",
        signalWords: ["recommend", "suggest", "insist", "request", "demand", "essential", "imperative", "important"]
      },
      {
        title: "Inversion (Đảo ngữ phủ định)",
        description: "Đưa trợ động từ lên trước chủ ngữ khi có trạng từ phủ định đứng đầu câu.",
        signalWords: ["rarely", "seldom", "never", "not only", "hardly", "no sooner"]
      }
    ],
    examples: [
      {
        english: "The consultant recommended that the manager upgrade the system immediately.",
        vietnamese: "Nhà tư vấn khuyên rằng quản lý nên nâng cấp hệ thống ngay lập tức.",
        explanation: "Cấu trúc giả định: 'upgrade' giữ nguyên mẫu không chia bất chấp chủ ngữ 'the manager' số ít."
      },
      {
        english: "Rarely do we witness such high level of customer satisfaction.",
        vietnamese: "Hiếm khi chúng tôi chứng kiến mức độ hài lòng của khách hàng cao như vậy.",
        explanation: "Đảo ngữ với trạng từ phủ định 'Rarely': trợ động từ 'do' đưa lên trước chủ ngữ 'we'."
      },
      {
        english: "It is essential that all staff members be present at the safety training session.",
        vietnamese: "Điều cần thiết là tất cả nhân viên phải có mặt tại buổi đào tạo an toàn.",
        explanation: "Cấu trúc giả định 'It is essential that...' đi với động từ nguyên mẫu 'be'."
      },
      {
        english: "Hardly had the meeting started when the fire alarm rang.",
        vietnamese: "Cuộc họp vừa mới bắt đầu thì chuông báo cháy đã reo.",
        explanation: "Cấu trúc 'Hardly ... when' diễn tả hành động vừa mới xảy ra thì hành động khác xen vào."
      },
      {
        english: "The marketing director suggested that we conduct a consumer survey.",
        vietnamese: "Giám đốc tiếp thị đề xuất rằng chúng tôi tiến hành một cuộc khảo sát người tiêu dùng.",
        explanation: "suggested that + S + V(nguyên mẫu) => dùng 'conduct'."
      }
    ],
    tips: [
      "Trong câu giả định (Subjunctive), động từ của mệnh đề sau 'that' luôn luôn ở dạng nguyên mẫu không 'to' (bare infinitive) — kể cả khi có 'not' thì dùng 'not + V(nguyên mẫu)' và động từ 'be' giữ nguyên là 'be'.",
      "Cấu trúc đảo ngữ phủ định: 'Negative Adverb (Seldom/Rarely/Never...) + Auxiliary Verb + Subject + Main Verb'. Nhìn cấu trúc này để chọn đúng trợ động từ.",
      "Cụm từ cấu trúc giả định phổ biến: 'recommend/suggest/insist/request/demand that S + V(nguyên mẫu)' hoặc 'It is crucial/important/essential/imperative that S + V(nguyên mẫu)'."
    ],
    commonMistakes: [
      "Chia thì bình thường cho mệnh đề giả định (ví dụ: 'The doctor recommended that he signs the paper' => Sai, phải dùng nguyên mẫu 'sign').",
      "Quên trợ động từ trong cấu trúc đảo ngữ (ví dụ viết: 'Rarely we see such progress' => Sai đảo ngữ, phải là 'Rarely do we see...')."
    ],
    quiz: [
      {
        question: "The legal adviser suggested that the contract ______ reviewed by a specialist before signing.",
        choices: ["is", "was", "be", "being"],
        answer: "be",
        explanation: "Cấu trúc giả định 'suggested that + S + V(nguyên mẫu)' => Chọn 'be'.",
        difficulty: "Hard"
      },
      {
        question: "Rarely ______ the marketing department launch a campaign without extensive market research.",
        choices: ["does", "do", "did", "is"],
        answer: "does",
        explanation: "Đảo ngữ với trạng từ phủ định 'Rarely'. Chủ ngữ 'the marketing department' (số ít) => Chọn trợ động từ 'does'.",
        difficulty: "Medium"
      },
      {
        question: "It is imperative that all financial records ______ submitted to the auditor by tomorrow morning.",
        choices: ["are", "were", "be", "been"],
        answer: "be",
        explanation: "Cấu trúc giả định 'It is imperative that + S + V(nguyên mẫu)' ở dạng bị động => Chọn 'be' (be submitted).",
        difficulty: "Hard"
      },
      {
        question: "No sooner had the software update been released ______ users began reporting compatibility bugs.",
        choices: ["when", "than", "before", "then"],
        answer: "than",
        explanation: "Cấu trúc song hành: 'No sooner ... than' (Vừa mới ... thì). 'Hardly/Scarcely' mới đi với 'when'.",
        difficulty: "Medium"
      },
      {
        question: "The director requested that every employee ______ the team-building event this weekend.",
        choices: ["attends", "attend", "attended", "to attend"],
        answer: "attend",
        explanation: "Cấu trúc giả định với động từ 'requested that' => Động từ sau chia nguyên mẫu 'attend' bất chấp chủ ngữ số ít 'every employee'.",
        difficulty: "Hard"
      }
    ]
  }
];
