// ─── Navbar ──────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Tính năng', href: '#tinh-nang' },
  { label: 'Trợ lý AI', href: '#tro-ly-ai' },
  { label: 'Vai trò', href: '#vai-tro' },
  { label: 'Miễn phí', href: '#mien-phi' },
] as const

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const HERO = {
  badge: 'Miễn phí · Tích hợp AI cho giảng dạy',
  heading: ['Quản lý trung tâm', 'miễn phí, cùng trợ lý', 'AI'],
  headingHighlight: 2, // index of the highlighted word in heading array (0-based last word)
  description:
    'INS Classes số hoá toàn bộ quy trình — ghi danh, điểm danh, bài tập, học phí — và có trợ lý AI hỗ trợ giảng viên soạn đề, chấm bài, tóm tắt buổi học. Hoàn toàn miễn phí.',
  ctaPrimary: 'Bắt đầu miễn phí',
  ctaSecondary: 'Xem demo',
  trustItems: ['Miễn phí 100%', 'Không cần thẻ tín dụng', 'Cài đặt vài phút'],
  avatars: ['MA', 'TH', 'KL', 'PS'],
  avatarText: '1.200+ người dùng tại các trung tâm',
} as const

// ─── Stats ────────────────────────────────────────────────────────────────────
export const STATS = [
  { value: '1.200+', label: 'Người dùng hoạt động' },
  { value: '48', label: 'Trung tâm tin dùng' },
  { value: '15.000+', label: 'Buổi điểm danh / tháng' },
  { value: '99,9%', label: 'Thời gian hoạt động' },
] as const

// ─── Features ────────────────────────────────────────────────────────────────
export const FEATURES = [
  {
    icon: 'users',
    title: 'Quản lý lớp & học viên',
    description:
      'Ghi danh, theo dõi sĩ số, trạng thái học (đang học, bảo lưu, hoàn thành) trong một danh sách trực quan.',
  },
  {
    icon: 'calendar-check',
    title: 'Điểm danh thông minh',
    description:
      'Tạo buổi học, điểm danh cả lớp chỉ với vài cú nhấp — đúng giờ, đi muộn, vắng — kèm thống kê tức thì.',
  },
  {
    icon: 'file-check',
    title: 'Giao & chấm bài tập',
    description:
      'Giảng viên giao bài, học viên nộp trực tuyến, chấm điểm và nhận xét — tất cả lưu vết rõ ràng.',
  },
  {
    icon: 'wallet',
    title: 'Quản lý học phí',
    description:
      'Theo dõi công nợ, nhắc hạn, lịch sử thanh toán và doanh thu theo lớp, theo khoá.',
  },
  {
    icon: 'shield',
    title: 'Phân quyền RBAC',
    description:
      'Admin · Giảng viên · Trợ giảng · Học viên — mỗi vai trò một bộ quyền rõ ràng, an toàn.',
  },
  {
    icon: 'bar-chart',
    title: 'Báo cáo & thống kê',
    description:
      'Bức tranh toàn cảnh: người dùng, lớp học, chuyên cần, doanh thu — cập nhật theo thời gian thực.',
  },
] as const

// ─── AI Section ───────────────────────────────────────────────────────────────
export const AI_BULLETS = [
  {
    icon: 'edit',
    title: 'Soạn đề & bài tập tự động',
    description: 'Mô tả yêu cầu, AI tạo ngay bộ câu hỏi và bài tập theo trình độ lớp.',
  },
  {
    icon: 'check-circle',
    title: 'Chấm bài & gợi ý nhận xét',
    description: 'AI đọc bài nộp, đề xuất điểm và nhận xét — giảng viên chỉ cần duyệt.',
  },
  {
    icon: 'file-text',
    title: 'Tóm tắt buổi học',
    description: 'Tự động tóm tắt nội dung và đầu việc sau mỗi buổi để gửi cho học viên.',
  },
  {
    icon: 'trending-up',
    title: 'Gợi ý lộ trình cá nhân hoá',
    description: 'Phân tích kết quả từng học viên và đề xuất nội dung ôn tập phù hợp.',
  },
] as const

// ─── AI Chat Mockup ────────────────────────────────────────────────────────────
export const AI_CHAT_MOCKUP = {
  userMessage:
    'Soạn giúp tôi 5 câu bài tập về vòng lặp for trong JavaScript cho lớp Fullstack-K15.',
  replyTitle: 'Đã tạo 5 câu bài tập',
  exercises: [
    'Tính tổng các số chẵn từ 1–100',
    'In bảng cửu chương n × 1…10',
    'Đếm số nguyên tố trong mảng',
    'Đảo ngược một chuỗi ký tự',
    'Báo ngập một chuỗi ký tự',
  ],
} as const

// ─── Roles ────────────────────────────────────────────────────────────────────
export const ROLES = [
  {
    icon: 'shield-user',
    color: 'blue',
    title: 'Quản trị viên',
    subtitle: 'Toàn quyền vận hành',
    bullets: [
      'Quản lý người dùng & phân quyền',
      'Tạo khoá học, lớp học',
      'Báo cáo doanh thu, thống kê',
      'Nhập / xuất dữ liệu Excel',
    ],
  },
  {
    icon: 'graduation-cap',
    color: 'green',
    title: 'Giảng viên',
    subtitle: 'Tập trung vào giảng dạy',
    bullets: [
      'Quản lý lớp được phân công',
      'Điểm danh & theo dõi chuyên cần',
      'Giao và chấm bài tập',
      'Thông báo tới lớp',
    ],
  },
  {
    icon: 'user',
    color: 'orange',
    title: 'Học viên',
    subtitle: 'Học tập tiện lợi',
    bullets: [
      'Xem lớp & thời khoá biểu',
      'Nộp bài tập trực tuyến',
      'Theo dõi điểm & chuyên cần',
      'Nhận thông báo từ lớp',
    ],
  },
] as const

// ─── Testimonial ──────────────────────────────────────────────────────────────
export const TESTIMONIAL = {
  quote:
    '"Từ khi dùng INS Classes, trung tâm chúng tôi không còn loay hoay với Excel và group chat. Điểm danh, học phí, bài tập đều gọn trong một chỗ — tiết kiệm hẳn vài giờ mỗi tuần."',
  avatar: 'LH',
  name: 'Cô Lê Thu Hương',
  role: 'Giám đốc đào tạo · Trung tâm INS',
} as const

// ─── Footer ───────────────────────────────────────────────────────────────────
export const FOOTER_COLUMNS = [
  {
    heading: 'Sản phẩm',
    links: ['Tính năng', 'Bảng giá', 'Bảo mật', 'Cập nhật'],
  },
  {
    heading: 'Công ty',
    links: ['Về chúng tôi', 'Tuyển dụng', 'Liên hệ', 'Blog'],
  },
  {
    heading: 'Hỗ trợ',
    links: ['Trung tâm trợ giúp', 'Tài liệu', 'Trạng thái hệ thống', 'Điều khoản'],
  },
] as const
