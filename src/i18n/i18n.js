// src/i18n/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      Home: "Home",
      Shop: "Shop",
      Contact: "Contact",
      About: "About",
      Login: "Login",
      Signup: "Signup",
      FastExecution: "Fast in executing orders",
      FastExecutionDesc:
        "Experience fast order fulfillment so you can enjoy your new products as quickly as possible, with minimal waiting time.",
      QualityAssurance: "Quality Assurance",
      QualityAssuranceDesc:
        "At our factory, we are committed to make exceptional quality in every product.We make only the highest quality.",
      ProductRange: "Product Range",
      ProductRangeDesc:
        "We offer a diverse range of comfortable products for men, women, and children. From classic products to trendy clogs",
      Support: "24/7 Support",
      SupportDesc:
        "Our dedicated support team is available around the clock to provide you with fast and friendly assistance.",
      ShopNow: "Shop Now",
      OurProductsWheel: "Our Product Wheel",
      PressAnywhereToFindMore: "Press anywhere to find more !",
      SubscribeNow: "Subscribe Now",
      WhyPeople: "Why People Like Us",
      WhyPeopleDesc:
        "Croslite is a world leader in innovative casual footwear for women, men, and children, combining comfort and style with a value that our incredible fans will know and love.",
      Accounts: "Account",
      LinkenIn: "LindenIn",
      Instagram: "Instagram",
      Facebook: "Facebook",
      TikTok: "TikTok",
      ReadMore: "ٌReed More",
      Address:
        " Unit 45 - area 118 factory's - Industrial Zone - South Of Raswa - Port Said, Egypt",
      Details: "Details",
      AddToCart: "Add To Cart",
      Search: "Search",
      Color: "Color",
      GetInTouch: "Get in touch",
      Question:
        "Have a question, comment, or suggestion? We'd love to hear from you!",
      LoginText: "Please login to your account",
      NoAccount: "Don't have an account ?",
      CreateNew: "Create New",
      WelcomeBack: "Welcome back !",
      LoginWelcome:
        "Login to access exclusive offers and manage your account, and to discover new arrivals and manage your orders.",
      FirstName: "First Name",
      LastName: "Last Name",
      UserName: "User Name",
      Company: "Company",
      Phone: "Phone",
      Gender: "Gender",
      Male: "Male",
      Female: "Female",
      Birthday: "Birthday",
      Email: "Email",
      Password: "Password",
      ConfirmPassword: "Confirm Password",
      SignUpText: "Register now",
      Page: "Page",
      Of: "of",
      PostComment: "Post Comment",
      PleaseRate: "Please rate",
      LeaveReview: "Leave a Review",
      AddressTitle: "Address",
      MailUs: "Mail Us",
      Submit: "Submit",
      KidsProducts: "Kids Products",
      Next: "Next",
      Prev: "Previous",
      Logout: "Logout",
      WhyChooseUs: "Why Choose Us",
      SustainabilityPractices: "Sustainability Practices",
      SustainabilityPracticesContent:
        "We are committed to eco-friendly practices. Our production processes minimize waste and use sustainable materials to ensure a better planet for future generations.",
      CustomerTestimonials: "Customer Testimonials",
      CustomerTestimonialsContent:
        "Customer feedback always pushes us forward to develop and progress, which is what we always strive for, and customer satisfaction is our goal and objective.",
      ContactUs: "Contact Us",
      YourName: " Enter your name",
      YourEmail: " Enter your email",
      YourMessage: " Enter your message",
      YourPassword: " Enter your password",
    },
  },
  ar: {
    translation: {
      Home: "الرئيسية",
      Shop: "التسوق",
      Contact: "اتصل بنا",
      About: "معلومات عنا",
      Login: "تسجيل الدخول",
      Signup: "إنشاء حساب",
      FastExecution: "سرعة في تنفيذ الطلبات",
      FastExecutionDesc:
        "استمتع بتنفيذ سريع للطلبات لتستمتع بمنتجاتك الجديدة في أسرع وقت ممكن.",
      QualityAssurance: "ضمان الجودة",
      QualityAssuranceDesc: "ملتزمون بتقديم أعلى مستويات الجودة في كل منتج.",
      ProductRange: "مجموعة المنتجات",
      ProductRangeDesc: "نقدم مجموعة متنوعة من المنتجات لجميع الأفراد.",
      Support: "الدعم على مدار الساعة",
      SupportDesc: "فريق الدعم لدينا متاح على مدار الساعة لتقديم المساعدة.",
      ShopNow: "تسوق منتجاتنا",
      OurProductsWheel: "عجلة منتاجتنا",
      PressAnywhereToFindMore: "اضغط على أي مكان للعثور على المزيد",
      SubscribeNow: "اشترك الان",
      WhyPeople: "لماذا يفضلنا الناس",
      WhyPeopleDesc:
        "كروس لايت هي شركة رائدة عالميًا في مجال الأحذية الكاجوال المبتكرة للنساء والرجال والأطفال، حيث تجمع بين الراحة والأناقة والقيمة التي سيعرفها ويحبها معجبونا .",
      Accounts: "حساباتنا",
      LinkedIn: "لينكد ان",
      Instagram: "انستجرام",
      Facebook: "فيسبوك",
      TikTok: "تيك توك",
      ReadMore: "اقرا المزيد",
      Address:
        "مصنع 45، مشروع 118 وحدة، مصنع المنطقة الصناعية، جنوب الرسوة، بورسعيد، مصر",
      Details: "تفاصيل",
      AddToCart: "اضف الي العربة",
      Search: "البحث",
      Color: "اللون",
      GetInTouch: "كن علي تواصل",
      Question: "لديك سؤال او تعليق او اقتراح ؟ نحن نحب سماعه",
      LoginText: "من فضلك قم بتسجيل الدخول",
      NoAccount: "ليس لديك حساب ؟",
      CreateNew: " حساب جديد",
      WelcomeBack: " !اهلا بك مرة اخري",
      LoginWelcome:
        "قم بتسجيل الدخول للوصول إلى العروض الحصرية وإدارة حسابك، واكتشاف العناصر الجديدة وإدارة طلباتك.",
      FirstName: "الاسم الاول",
      LastName: "الاسم الاخير",
      UserName: "اسم المستخدم",
      Company: "الشركة",
      Phone: "رقم الهاتف",
      Gender: "النوع",
      Male: "ذكر",
      Female: "أنثي",
      Birthday: "تاريخ الميلاد",
      Email: "البريد الالكتروني",
      Password: "كلمة السر",
      ConfirmPassword: "اعد كتابة كلمة السر",
      SignUpText: "سجل دخول الان",
      Page: "الصفحة",
      Of: "من",
      PostComment: "اضف تعليق",
      PleaseRate: "اضف تقييم",
      LeaveReview: "اضف تعليق",
      AddressTitle: "العنوان",
      MailUs: "راسلنا",
      Submit: "ارسل",
      KidsProducts: "منتجات الأطفال",
      Next: "التالي",
      Prev: "السابق",
      Logout: "تسجيل الخروج",
      WhyChooseUs: "لماذا تختارنا ؟",
      SustainabilityPractices: "الاستدامة",
      SustainabilityPracticesContent:
        "نحن ملتزمون بالممارسات الصديقة للبيئة. تقلل عمليات الإنتاج لدينا من النفايات وتستخدم مواد مستدامة لضمان كوكب أفضل للأجيال القادمة.",
      CustomerTestimonials: "شهادة العملاء",
      CustomerTestimonialsContent:
        "اراء العملاء دائما ما تقوم بدفعنا للامام للتطور و التقدم و هو ما نسعي اليه دائما و رضا العملاء هو غايتنا و هدفنا .",
      ContactUs: "تواصل معنا",
      YourName: "ادخل اسمك",
      YourEmail: "ادخل بريدك الالكتروني",
      YourMessage: "ادخل رسالتك",
      YourPassword:"ادخل الرقم السري"
    },
  },
};

i18n
  .use(LanguageDetector) // automatically detect user language
  .use(initReactI18next) // pass i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", // default language
    interpolation: {
      escapeValue: false, // react already escapes by default
    },
  });

export default i18n;
