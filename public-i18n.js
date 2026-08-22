const SUT_LANGUAGE_KEY = "sut-physics-public-language";

const textTranslations = {
  "Skip to main content": "ข้ามไปยังเนื้อหาหลัก",
  "Prototype data": "ข้อมูลตัวอย่าง",
  "Live registry": "ฐานข้อมูลออนไลน์",
  "Equipment names and figures below are illustrative. Replace them with verified institutional data.": "ชื่อเครื่องมือและตัวเลขด้านล่างเป็นข้อมูลตัวอย่าง กรุณาแทนที่ด้วยข้อมูลสถาบันที่ตรวจสอบแล้ว",
  "Faculty profiles are generated from verified public faculty records when available.": "โปรไฟล์คณาจารย์สร้างจากข้อมูลคณาจารย์สาธารณะที่ตรวจสอบแล้วเมื่อมีข้อมูล",
  "Faculty expertise": "ความเชี่ยวชาญของคณาจารย์",
  "Explore faculty expertise, research interests, and collaboration contacts across the School of Physics.": "สำรวจความเชี่ยวชาญ ความสนใจด้านวิจัย และช่องทางติดต่อเพื่อความร่วมมือของคณาจารย์สาขาวิชาฟิสิกส์",
  "Showing live facilities and verified equipment approved for the public research profile.": "กำลังแสดงห้องปฏิบัติการออนไลน์และเครื่องมือที่ตรวจสอบแล้วซึ่งอนุมัติให้แสดงในโปรไฟล์วิจัยสาธารณะ",
  "Showing live facilities from Supabase. Equipment records will appear after they are verified and marked public.": "กำลังแสดงห้องปฏิบัติการจาก Supabase รายการเครื่องมือจะแสดงเมื่อผ่านการตรวจสอบและกำหนดให้เป็นสาธารณะ",
  "Showing live facilities from Supabase and example equipment until verified public equipment records are available.": "กำลังแสดงห้องปฏิบัติการจาก Supabase พร้อมเครื่องมือตัวอย่างจนกว่าจะมีรายการเครื่องมือสาธารณะที่ตรวจสอบแล้ว",
  "Supabase is connected, but no equipment has been approved for public display yet. Showing example records until the registry is populated.": "เชื่อมต่อ Supabase แล้ว แต่ยังไม่มีเครื่องมือที่อนุมัติให้แสดงสาธารณะ จึงแสดงรายการตัวอย่างจนกว่าจะมีข้อมูลในระบบจัดการ",
  "Open internal registry": "เปิดระบบจัดการภายใน",
  "School of Physics": "สาขาวิชาฟิสิกส์",
  "Research Infrastructure": "โครงสร้างพื้นฐานด้านการวิจัย",
  "Faculty & Expertise": "คณาจารย์และความเชี่ยวชาญ",
  "Services": "บริการ",
  "services": "บริการ",
  "Institute of Science, Suranaree University of Technology": "สำนักวิชาวิทยาศาสตร์ มหาวิทยาลัยเทคโนโลยีสุรนารี",
  "Institute of Science,": "สำนักวิชาวิทยาศาสตร์",
  "Suranaree University of Technology": "มหาวิทยาลัยเทคโนโลยีสุรนารี",
  "Menu": "เมนู",
  "Primary navigation": "เมนูหลัก",
  "Language": "ภาษา",
  "Capabilities": "โครงสร้างพื้นฐาน",
  "Facilities": "ห้องปฏิบัติการ",
  "Equipment": "เครื่องมือ",
  "equipment": "เครื่องมือ",
  "Faculty": "คณาจารย์",
  "faculty": "คณาจารย์",
  "CURRENT STUDENTS": "นักศึกษาปัจจุบัน",
  "Students": "นักศึกษา",
  "students": "นักศึกษา",
  "Researchers": "นักวิจัย",
  "researchers": "นักวิจัย",
  "RESEARCHERS": "นักวิจัย",
  "Student portal": "พอร์ทัลนักศึกษา",
  "Access": "การเข้าใช้",
  "Contact": "ติดต่อ",
  "Overview": "ภาพรวม",
  "Expertise": "ความเชี่ยวชาญ",
  "Survey": "แบบสำรวจ",
  "Start a conversation": "เริ่มพูดคุย",
  "Explore equipment": "ดูเครื่องมือ",
  "Research facilities": "ห้องปฏิบัติการวิจัย",
  "Open to discovery": "เปิดสู่การค้นคว้า",
  "See further.": "มองเห็นเหนือขีดจำกัด",
  "Measure deeper.": "วัดได้ลึกกว่าเดิม",
  "Explore Physics SUT shared instruments, specialist spaces, and technical expertise that move ideas from first observation to reproducible result.": "สำรวจเครื่องมือใช้ร่วมกัน ห้องปฏิบัติการวิจัย และความเชี่ยวชาญทางเทคนิคของ Physics SUT ที่ช่วยพัฒนาแนวคิดจากการสังเกตครั้งแรกไปสู่ผลลัพธ์ที่ทำซ้ำได้",
  "Explore the equipment": "ดูเครื่องมือ",
  "How facility access works": "ขั้นตอนการเข้าใช้ห้องปฏิบัติการ",
  "Abstract illustration showing measurements across physical scales": "ภาพประกอบเชิงนามธรรมของการวัดในหลายระดับทางกายภาพ",
  "material": "วัสดุ",
  "device": "อุปกรณ์",
  "environment": "สภาพแวดล้อม",
  "example": "ตัวอย่าง",
  "systems": "ระบบ",
  "verified": "ตรวจสอบแล้ว",
  "atlas": "แอตลาส",
  "public": "สาธารณะ",
  "public + examples": "ข้อมูลสาธารณะและตัวอย่าง",
  "public records": "รายการสาธารณะ",
  "example records": "รายการตัวอย่าง",
  "facility clusters": "กลุ่มห้องปฏิบัติการ",
  "capability areas": "ด้านความสามารถ",
  "One connected environment for measurement, fabrication, modeling, and collaboration across Physics SUT research facilities.": "สภาพแวดล้อมที่เชื่อมโยงการวัด การสร้างชิ้นงาน การสร้างแบบจำลอง และความร่วมมือในห้องปฏิบัติการวิจัยของ Physics SUT",
  "Research spectrum": "ขอบเขตงานวิจัย",
  "From atomic structure": "จากโครงสร้างระดับอะตอม",
  "to complex systems.": "สู่ระบบที่ซับซ้อน",
  "Our infrastructure supports the full experimental loop: make, observe, measure, and model.": "โครงสร้างพื้นฐานของเรารองรับวงจรการทดลองครบถ้วน ตั้งแต่การสร้าง การสังเกต การวัด และการสร้างแบบจำลอง",
  "Four research capabilities arranged from nanometer to system scale": "ความสามารถด้านการวิจัยสี่ด้านตั้งแต่ระดับนาโนเมตรถึงระดับระบบ",
  "Scale of inquiry": "ระดับของการศึกษา",
  "Observe": "สังเกต",
  "observe": "สังเกต",
  "Resolve structures and signals beyond ordinary vision.": "แยกแยะโครงสร้างและสัญญาณที่เกินขอบเขตการมองเห็นทั่วไป",
  "Fabricate": "สร้างชิ้นงาน",
  "fabricate": "สร้างชิ้นงาน",
  "Prepare samples and engineer controlled material systems.": "เตรียมตัวอย่างและออกแบบระบบวัสดุที่ควบคุมได้",
  "Measure": "วัด",
  "measure": "วัด",
  "Capture optical, electrical, thermal, and radiation response.": "บันทึกการตอบสนองทางแสง ไฟฟ้า ความร้อน และรังสี",
  "Model": "จำลอง",
  "model": "จำลอง",
  "Connect experimental evidence with computation and theory.": "เชื่อมโยงหลักฐานจากการทดลองกับการคำนวณและทฤษฎี",
  "Facilities map": "แผนที่ห้องปฏิบัติการ",
  "Where research": "จากงานวิจัย",
  "comes together.": "สู่การใช้ประโยชน์เพื่อสังคม",
  "Explore the laboratory clusters that host public-facing equipment, expertise, and example use cases.": "สำรวจกลุ่มห้องปฏิบัติการที่มีเครื่องมือ ความเชี่ยวชาญ และตัวอย่างการใช้งานสำหรับผู้สนใจ",
  "Equipment atlas": "แอตลาสเครื่องมือ",
  "Tools for asking": "ตอบโจทย์วิจัยที่ท้าทาย",
  "better questions.": "ด้วยเทคโนโลยีที่เราสร้างเอง",
  "Filter the sample collection by the part of the research process it supports.": "กรองรายการตัวอย่างตามส่วนของกระบวนการวิจัยที่เครื่องมือรองรับ",
  "All equipment": "เครื่องมือทั้งหมด",
  "Facility access": "การเข้าใช้ห้องปฏิบัติการ",
  "A clear path from": "จากคำถามวิจัย",
  "question to instrument.": "สู่เครื่องมือที่ใช่",
  "Whether you are beginning a student project or planning a cross-disciplinary study, start with the research question. The facility team can help identify the right method.": "ไม่ว่าคุณจะเริ่มโครงงานนักศึกษาหรือวางแผนงานวิจัยข้ามสาขา ให้เริ่มจากคำถามวิจัย ทีมงานห้องปฏิบัติการสามารถช่วยเลือกวิธีที่เหมาะสมได้",
  "Share your question": "บอกคำถามของคุณ",
  "Describe the sample, signal, or phenomenon you need to investigate.": "อธิบายตัวอย่าง สัญญาณ หรือปรากฏการณ์ที่ต้องการศึกษา",
  "Plan the method": "วางแผนวิธีการ",
  "Discuss feasibility, preparation, training, scheduling, and data needs.": "หารือเรื่องความเป็นไปได้ การเตรียมตัวอย่าง การฝึกอบรม ตารางเวลา และข้อมูลที่ต้องใช้",
  "Run with support": "ดำเนินงานพร้อมการสนับสนุน",
  "Work safely with an instrument specialist and record a reproducible method.": "ทำงานอย่างปลอดภัยกับผู้เชี่ยวชาญเครื่องมือและบันทึกวิธีการที่ทำซ้ำได้",
  "Collaborate": "ร่วมงาน",
  "What could you": "คำถามคือ",
  "measure next?": "คุณอยากวัดอะไร?",
  "Bring us the question. We’ll help map the route from sample preparation to interpretable data.": "นำคำถามมาคุยกับเรา เราจะช่วยวางเส้นทางจากการเตรียมตัวอย่างไปสู่ข้อมูลที่ตีความได้",
  "Discuss a project": "ปรึกษาโครงการ",
  "Select an equipment record to contact its responsible person.": "เลือกเครื่องมือเพื่อดูผู้รับผิดชอบที่สามารถติดต่อได้",
  "Project inquiry": "สอบถามโครงการ",
  "Discuss an equipment project": "ปรึกษาโครงการที่เกี่ยวกับเครื่องมือ",
  "Close inquiry form": "ปิดแบบฟอร์มสอบถาม",
  "Equipment of interest": "เครื่องมือที่สนใจ",
  "Choose equipment": "เลือกเครื่องมือ",
  "contact email needed": "ต้องเพิ่มอีเมลติดต่อ",
  "Select equipment to see the responsible contact.": "เลือกเครื่องมือเพื่อดูผู้รับผิดชอบ",
  "Your name": "ชื่อของคุณ",
  "Your email": "อีเมลของคุณ",
  "Organization or research group": "หน่วยงานหรือกลุ่มวิจัย",
  "Project question": "คำถามของโครงการ",
  "This opens your email application. No information is submitted by this website.": "ระบบจะเปิดโปรแกรมอีเมลของคุณ เว็บไซต์นี้ไม่ได้ส่งข้อมูลโดยตรง",
  "Prepare email": "เตรียมอีเมล",
  "Equipment gallery": "แกลเลอรีเครื่องมือ",
  "Example use-case gallery": "แกลเลอรีตัวอย่างการใช้งาน",
  "Full-size image": "ภาพขนาดเต็ม",
  "Close image preview": "ปิดตัวอย่างภาพ",
  "Back to top": "กลับขึ้นด้านบน",
  "Faculty directory": "ทำเนียบคณาจารย์",
  "Research mentorship": "การให้คำปรึกษาวิจัย",
  "Meet our faculty": "รู้จักคณาจารย์",
  "through research and service.": "ผ่านงานวิจัยและบริการ",
  "Connect research questions with Physics SUT faculty expertise, facility leads, and responsible equipment contacts across the Physics Program.": "เชื่อมคำถามวิจัยกับความเชี่ยวชาญของคณาจารย์ Physics SUT หัวหน้าห้องปฏิบัติการ และผู้รับผิดชอบเครื่องมือในสาขาวิชาฟิสิกส์",
  "View faculty contacts": "ดูรายชื่อคณาจารย์",
  "Browse faculty contacts": "ดูรายชื่อคณาจารย์",
  "Browse facilities": "ดูห้องปฏิบัติการ",
  "Abstract network of faculty, facilities, and research systems": "เครือข่ายเชิงนามธรรมของคณาจารย์ ห้องปฏิบัติการ และระบบวิจัย",
  "contacts": "รายชื่อ",
  "contact": "ติดต่อ",
  "Directory status": "สถานะทำเนียบ",
  "public contacts": "รายชื่อสาธารณะ",
  "expertise areas": "ด้านความเชี่ยวชาญ",
  "linked systems": "ระบบที่เชื่อมโยง",
  "Use the directory to find faculty by expertise area, related facilities, and research systems.": "ใช้ทำเนียบนี้เพื่อค้นหาคณาจารย์ตามด้านความเชี่ยวชาญ ห้องปฏิบัติการที่เกี่ยวข้อง และระบบวิจัย",
  "People": "บุคลากร",
  "Faculty contacts": "รายชื่อคณาจารย์",
  "by research area.": "ตามด้านวิจัย",
  "Browse Physics SUT faculty expertise, research interests, and contact pathways for study, research collaboration, services, and facility questions.": "ดูความเชี่ยวชาญของคณาจารย์ Physics SUT ความสนใจด้านวิจัย และช่องทางติดต่อสำหรับการเรียน การร่วมวิจัย บริการวิชาการ และคำถามเกี่ยวกับห้องปฏิบัติการ",
  "Filter faculty by expertise": "กรองคณาจารย์ตามความเชี่ยวชาญ",
  "All expertise": "ความเชี่ยวชาญทั้งหมด",
  "Expertise map": "แผนที่ความเชี่ยวชาญ",
  "Research groups": "กลุ่มวิจัย",
  "connected to facilities.": "ที่เชื่อมโยงกับห้องปฏิบัติการ",
  "Use this view to understand where faculty mentorship, specialist methods, and shared instrumentation currently intersect.": "ใช้มุมมองนี้เพื่อดูจุดเชื่อมโยงระหว่างการให้คำปรึกษาของคณาจารย์ วิธีการเฉพาะทาง และเครื่องมือใช้ร่วมกัน",
  "Need the right": "ต้องการติดต่อ",
  "faculty contact?": "คณาจารย์ที่เหมาะสม",
  "Start with the research area, facility, or equipment closest to your question. We can help identify an appropriate faculty contact.": "เริ่มจากด้านวิจัย ห้องปฏิบัติการ หรือเครื่องมือที่ใกล้กับคำถามของคุณ เราสามารถช่วยระบุคณาจารย์ที่เหมาะสมสำหรับการติดต่อได้",
  "Faculty contacts help visitors connect with the right expertise.": "รายชื่อคณาจารย์ช่วยให้ผู้สนใจเชื่อมต่อกับความเชี่ยวชาญที่เหมาะสม",
  "Physics faculty · Research, teaching, and collaboration": "คณาจารย์ฟิสิกส์ · วิจัย การสอน และความร่วมมือ",
  "Physics services": "บริการด้านฟิสิกส์",
  "Visitor requests": "คำขอจากผู้สนใจ",
  "Services for": "บริการด้าน",
  "measurement, learning, and outreach.": "การวัด การเรียนรู้ และกิจกรรมบริการวิชาการ",
  "Request support from Physics SUT for certified measurements, short courses, workshops, and STEM activities connected to physics expertise at SUT.": "ขอรับการสนับสนุนจาก Physics SUT ด้านการวัดที่รับรองได้ หลักสูตรระยะสั้น เวิร์กช็อป และกิจกรรม STEM ที่เชื่อมโยงกับความเชี่ยวชาญด้านฟิสิกส์ของ มทส.",
  "View services": "ดูบริการ",
  "Share your need": "แจ้งความต้องการ",
  "public services": "บริการสาธารณะ",
  "Categories": "หมวดหมู่",
  "certified measurements": "การวัดที่รับรองได้",
  "short courses": "หลักสูตรระยะสั้น",
  "workshops": "เวิร์กช็อป",
  "STEM services": "บริการ STEM",
  "Use the survey below to share the kind of service, timing, format, and outcome you are looking for.": "ใช้แบบสำรวจด้านล่างเพื่อแจ้งประเภทบริการ ช่วงเวลา รูปแบบ และผลลัพธ์ที่ต้องการ",
  "Service options": "ตัวเลือกบริการ",
  "for visitors and partners.": "สำหรับผู้สนใจและพันธมิตร",
  "Browse available service areas, then use the survey to describe a measurement, training, workshop, or outreach need.": "ดูขอบเขตบริการที่มี แล้วใช้แบบสำรวจเพื่ออธิบายความต้องการด้านการวัด การอบรม เวิร์กช็อป หรือกิจกรรมบริการวิชาการ",
  "Filter services by category": "กรองบริการตามหมวดหมู่",
  "All services": "บริการทั้งหมด",
  "Certified measurements": "การวัดที่รับรองได้",
  "Short courses": "หลักสูตรระยะสั้น",
  "Workshops": "เวิร์กช็อป",
  "Needs survey": "แบบสำรวจความต้องการ",
  "Tell us what": "บอกเราว่า",
  "service you need.": "ต้องการบริการอะไร",
  "Your answers help Physics SUT understand the service area, audience, timing, and outcome you have in mind.": "คำตอบของคุณช่วยให้ Physics SUT เข้าใจประเภทบริการ กลุ่มเป้าหมาย ช่วงเวลา และผลลัพธ์ที่ต้องการ",
  "Service area": "ประเภทบริการ",
  "Select every category that may fit your need.": "เลือกทุกหมวดหมู่ที่ตรงกับความต้องการของคุณ",
  "Your role": "บทบาทของคุณ",
  "Choose one": "เลือกหนึ่งรายการ",
  "Industry or company partner": "ภาคอุตสาหกรรมหรือบริษัท",
  "Researcher or laboratory staff": "นักวิจัยหรือบุคลากรห้องปฏิบัติการ",
  "University student": "นักศึกษามหาวิทยาลัย",
  "School teacher": "ครู",
  "School student": "นักเรียน",
  "Government or public organization": "หน่วยงานรัฐหรือองค์กรสาธารณะ",
  "Other visitor": "ผู้สนใจประเภทอื่น",
  "Preferred timing": "ช่วงเวลาที่ต้องการ",
  "As soon as possible": "เร็วที่สุดเท่าที่เป็นไปได้",
  "Within 1 month": "ภายใน 1 เดือน",
  "Within 3 months": "ภายใน 3 เดือน",
  "This semester": "ภายในภาคการศึกษานี้",
  "Still exploring": "ยังอยู่ระหว่างสำรวจความเป็นไปได้",
  "Preferred format": "รูปแบบที่ต้องการ",
  "On campus at SUT": "ที่มหาวิทยาลัยเทคโนโลยีสุรนารี",
  "Online": "ออนไลน์",
  "Hybrid": "ผสมผสาน",
  "On-site at my organization": "จัด ณ หน่วยงานของฉัน",
  "Not sure yet": "ยังไม่แน่ใจ",
  "Expected group size": "จำนวนผู้เข้าร่วมโดยประมาณ",
  "Main need or question": "ความต้องการหรือคำถามหลัก",
  "Output or outcome you hope for": "ผลลัพธ์ที่คาดหวัง",
  "Email for follow-up": "อีเมลสำหรับติดต่อกลับ",
  "Organization or school": "หน่วยงานหรือโรงเรียน",
  "Select at least one service area before preparing the email draft.": "เลือกประเภทบริการอย่างน้อยหนึ่งรายการก่อนเตรียมร่างอีเมล",
  "Prepare email draft": "เตรียมร่างอีเมล",
  "Request": "คำขอ",
  "Need a": "ต้องการ",
  "physics service?": "บริการด้านฟิสิกส์หรือไม่",
  "Share your service need through the survey, or start with the faculty directory if you already know the expertise area you need.": "แจ้งความต้องการผ่านแบบสำรวจ หรือเริ่มจากทำเนียบคณาจารย์หากทราบด้านความเชี่ยวชาญที่ต้องการแล้ว",
  "Browse faculty": "ดูคณาจารย์",
  "We use your answers to identify the closest expertise area.": "เราจะใช้คำตอบของคุณเพื่อระบุด้านความเชี่ยวชาญที่ใกล้เคียงที่สุด",
  "Physics services · Measurements, learning, workshops, and STEM": "บริการฟิสิกส์ · การวัด การเรียนรู้ เวิร์กช็อป และ STEM",
  "Physics researchers": "นักวิจัยฟิสิกส์",
  "Postdocs · Postgraduate researchers · Fellows · Research staff": "นักวิจัยหลังปริญญาเอก · นักวิจัยระดับบัณฑิตศึกษา · เฟลโลว์ · บุคลากรวิจัย",
  "Researchers working with us": "นักวิจัยที่ร่วมงานกับเรา",
  "to advance science and technology.": "เพื่อขับเคลื่อนวิทยาศาสตร์และเทคโนโลยี",
  "Browse public researcher profiles by role type, host faculty, project, and research lab or group.": "ดูโปรไฟล์นักวิจัยสาธารณะตามประเภทบทบาท อาจารย์ผู้ดูแล โครงการ และห้องปฏิบัติการหรือกลุ่มวิจัย",
  "View researchers": "ดูรายชื่อนักวิจัย",
  "Browse faculty hosts": "ดูอาจารย์ผู้ดูแล",
  "public researchers": "นักวิจัยสาธารณะ",
  "Research roles": "บทบาทนักวิจัย",
  "postdocs": "หลังปริญญาเอก",
  "postgraduate researchers": "นักวิจัยระดับบัณฑิตศึกษา",
  "fellows": "เฟลโลว์",
  "visitors": "นักวิจัยเยี่ยมเยียน",
  "public profiles": "โปรไฟล์สาธารณะ",
  "Public researcher profiles will appear here after records are verified and marked public.": "โปรไฟล์นักวิจัยสาธารณะจะแสดงที่นี่หลังจากตรวจสอบและกำหนดให้แสดงสาธารณะ",
  "Researcher profiles": "โปรไฟล์นักวิจัย",
  "by host and group.": "ตามอาจารย์ผู้ดูแลและกลุ่มวิจัย",
  "Use filters to see postgraduate researchers, postdocs, research fellows, visiting researchers, research assistants, and project researchers connected to the School of Physics at SUT.": "ใช้ตัวกรองเพื่อดูนักวิจัยระดับบัณฑิตศึกษา นักวิจัยหลังปริญญาเอก เฟลโลว์ นักวิจัยเยี่ยมเยียน ผู้ช่วยวิจัย และนักวิจัยโครงการที่เชื่อมโยงกับสาขาวิชาฟิสิกส์ มทส.",
  "Filter researchers": "กรองนักวิจัย",
  "All roles": "ทุกบทบาท",
  "Postgraduate researchers": "นักวิจัยระดับบัณฑิตศึกษา",
  "Postdocs": "หลังปริญญาเอก",
  "Fellows": "เฟลโลว์",
  "Visitors": "นักวิจัยเยี่ยมเยียน",
  "Research assistants": "ผู้ช่วยวิจัย",
  "Staff": "บุคลากร",
  "Physics staff": "บุคลากรฟิสิกส์",
  "Administration · Teaching · Technical support": "งานธุรการ · การสอน · งานสนับสนุนเทคนิค",
  "Staff supporting": "บุคลากรที่สนับสนุน",
  "learning, research, and service.": "การเรียนรู้ การวิจัย และบริการวิชาการ",
  "Browse public staff profiles by position type, unit, responsibilities, and linked lab or group.": "ดูโปรไฟล์บุคลากรสาธารณะตามตำแหน่ง หน่วยงาน หน้าที่รับผิดชอบ และห้องปฏิบัติการหรือกลุ่มที่เกี่ยวข้อง",
  "View staff": "ดูรายชื่อบุคลากร",
  "Staff portal": "พอร์ทัลบุคลากร",
  "public staff": "บุคลากรสาธารณะ",
  "Staff roles": "บทบาทบุคลากร",
  "administration": "ธุรการ",
  "teaching assistants": "ผู้ช่วยสอน",
  "laboratory technicians": "เจ้าหน้าที่ห้องปฏิบัติการ",
  "technical staff": "บุคลากรเทคนิค",
  "Public staff profiles will appear here after records are verified and marked public.": "โปรไฟล์บุคลากรสาธารณะจะแสดงที่นี่หลังจากตรวจสอบและกำหนดให้แสดงสาธารณะ",
  "Staff profiles": "โปรไฟล์บุคลากร",
  "by role and unit.": "ตามบทบาทและหน่วยงาน",
  "Use filters to see administrative staff, teaching assistants, laboratory technicians, technical staff, and academic support staff connected to the School of Physics at SUT.": "ใช้ตัวกรองเพื่อดูบุคลากรธุรการ ผู้ช่วยสอน เจ้าหน้าที่ห้องปฏิบัติการ บุคลากรเทคนิค และบุคลากรสนับสนุนวิชาการที่เชื่อมโยงกับสาขาวิชาฟิสิกส์ มทส.",
  "Filter staff": "กรองบุคลากร",
  "All staff": "บุคลากรทั้งหมด",
  "Administrative": "ธุรการ",
  "Teaching assistants": "ผู้ช่วยสอน",
  "Lab technicians": "เจ้าหน้าที่ห้องปฏิบัติการ",
  "Technical staff": "บุคลากรเทคนิค",
  "All units": "ทุกหน่วยงาน",
  "Position": "ตำแหน่ง",
  "Unit": "หน่วยงาน",
  "Staff profile": "โปรไฟล์บุคลากร",
  "Responsibilities": "หน้าที่รับผิดชอบ",
  "Service areas": "ขอบเขตงานบริการ",
  "Staff bio coming soon.": "กำลังเตรียมข้อมูลประวัติบุคลากร",
  "No public staff profiles yet": "ยังไม่มีโปรไฟล์บุคลากรสาธารณะ",
  "Administrative staff, teaching assistants, technical staff, and academic support staff will appear here after verification.": "บุคลากรธุรการ ผู้ช่วยสอน บุคลากรเทคนิค และบุคลากรสนับสนุนวิชาการจะแสดงที่นี่หลังจากตรวจสอบแล้ว",
  "Host / PI": "อาจารย์ผู้ดูแล / PI",
  "All hosts": "อาจารย์ผู้ดูแลทั้งหมด",
  "All groups": "ทุกกลุ่ม",
  "All statuses": "ทุกสถานะ",
  "Service interests": "ความสนใจด้านบริการ",
  "Services coming soon": "บริการกำลังจะเปิดให้ใช้งาน",
  "We are gathering interest in measurements, short courses, workshops, and STEM activities. Share your need below to help shape future service options.": "เรากำลังรวบรวมความสนใจด้านการวัด หลักสูตรระยะสั้น เวิร์กช็อป และกิจกรรม STEM โปรดแจ้งความต้องการของคุณเพื่อช่วยกำหนดบริการในอนาคต"
  ,
  "Details to verify": "รายละเอียดรอตรวจสอบ",
  "Close detail view": "ปิดหน้ารายละเอียด",
  "Detail view": "รายละเอียด",
  "Research spectrum": "ขอบเขตงานวิจัย",
  "Capability area": "ด้านความสามารถ",
  "Research scale": "ระดับงานวิจัย",
  "Equipment count": "จำนวนเครื่องมือ",
  "Typical methods": "วิธีการที่ใช้บ่อย",
  "Useful questions": "คำถามที่เหมาะสม",
  "Expected outputs": "ผลลัพธ์ที่คาดหวัง",
  "Facility": "ห้องปฏิบัติการ",
  "Facility ID": "รหัสห้องปฏิบัติการ",
  "Public systems": "ระบบสาธารณะ",
  "Linked equipment": "เครื่องมือที่เชื่อมโยง",
  "Linked equipment to confirm": "รอยืนยันเครื่องมือที่เชื่อมโยง",
  "Equipment": "เครื่องมือ",
  "Verified record": "รายการที่ตรวจสอบแล้ว",
  "Sample record": "รายการตัวอย่าง",
  "Category": "หมวดหมู่",
  "Method": "วิธีการ",
  "Access": "การเข้าใช้",
  "Responsible contact": "ผู้รับผิดชอบ",
  "Email": "อีเมล",
  "Manufacturer": "ผู้ผลิต",
  "Model": "รุ่น",
  "Room": "ห้อง",
  "Safety": "ความปลอดภัย",
  "Use cases": "ตัวอย่างการใช้งาน",
  "Use cases to confirm": "รอยืนยันตัวอย่างการใช้งาน",
  "Gallery": "แกลเลอรี",
  "No gallery images yet": "ยังไม่มีภาพแกลเลอรี",
  "Contact email to add": "รอเพิ่มอีเมลติดต่อ",
  "Discuss this equipment": "ปรึกษาเรื่องเครื่องมือนี้",
  "Resolve structures, images, and signals that cannot be captured by ordinary visual inspection.": "แยกแยะโครงสร้าง ภาพ และสัญญาณที่ไม่สามารถเห็นได้ด้วยการสังเกตทั่วไป",
  "Prepare samples, prototypes, fibers, materials, and controlled device structures for experiments.": "เตรียมตัวอย่าง ต้นแบบ เส้นใย วัสดุ และโครงสร้างอุปกรณ์ที่ควบคุมได้สำหรับการทดลอง",
  "Capture optical, electrical, thermal, spectral, and radiation responses with appropriate instrumentation.": "บันทึกการตอบสนองทางแสง ไฟฟ้า ความร้อน สเปกตรัม และรังสีด้วยเครื่องมือที่เหมาะสม",
  "Connect experimental evidence with computation, simulation, data analysis, and theory.": "เชื่อมโยงหลักฐานจากการทดลองกับการคำนวณ การจำลอง การวิเคราะห์ข้อมูล และทฤษฎี",
  "Microscopy": "กล้องจุลทรรศน์",
  "Tomography": "โทโมกราฟี",
  "Biomedical imaging": "การสร้างภาพชีวการแพทย์",
  "What structure is present?": "มีโครงสร้างอะไรอยู่?",
  "How does the signal vary across space?": "สัญญาณเปลี่ยนแปลงตามตำแหน่งอย่างไร?",
  "Can the image reveal a hidden pattern?": "ภาพช่วยเปิดเผยรูปแบบที่ซ่อนอยู่ได้หรือไม่?",
  "Images": "ภาพ",
  "Spatial maps": "แผนที่เชิงพื้นที่",
  "Feature measurements": "การวัดลักษณะสำคัญ",
  "Electrospinning": "อิเล็กโตรสปินนิง",
  "3D printing": "การพิมพ์สามมิติ",
  "Fiber fabrication": "การสร้างเส้นใย",
  "Integrated photonics": "โฟโตนิกส์แบบบูรณาการ",
  "What structure needs to be made?": "ต้องสร้างโครงสร้างแบบใด?",
  "Which preparation route is feasible?": "แนวทางเตรียมตัวอย่างใดทำได้จริง?",
  "How reproducible is the process?": "กระบวนการทำซ้ำได้ดีเพียงใด?",
  "Samples": "ตัวอย่าง",
  "Prototype devices": "อุปกรณ์ต้นแบบ",
  "Prepared test structures": "โครงสร้างทดสอบที่เตรียมไว้",
  "Spectroscopy": "สเปกโทรสโกปี",
  "Optical sensing": "การตรวจวัดด้วยแสง",
  "Laser measurements": "การวัดด้วยเลเซอร์",
  "Data acquisition": "การเก็บข้อมูล",
  "Which signal matters?": "สัญญาณใดสำคัญ?",
  "What precision is required?": "ต้องการความแม่นยำระดับใด?",
  "How should the method be calibrated?": "ควรสอบเทียบวิธีการอย่างไร?",
  "Spectra": "สเปกตรัม",
  "Response curves": "กราฟการตอบสนอง",
  "Measurement datasets": "ชุดข้อมูลการวัด",
  "Quantum systems": "ระบบควอนตัม",
  "Computer vision": "คอมพิวเตอร์วิทัศน์",
  "Medical AI": "ปัญญาประดิษฐ์ทางการแพทย์",
  "What model explains the result?": "แบบจำลองใดอธิบายผลลัพธ์ได้?",
  "Can computation guide the experiment?": "การคำนวณช่วยชี้นำการทดลองได้หรือไม่?",
  "How robust is the prediction?": "การคาดการณ์มีความทนทานเพียงใด?",
  "Models": "แบบจำลอง",
  "Predictions": "การคาดการณ์",
  "Analysis workflows": "ขั้นตอนการวิเคราะห์",
  "Location to verify": "สถานที่รอตรวจสอบ",
  "Capabilities to verify": "ความสามารถรอตรวจสอบ",
  "Lead": "ผู้ดูแล",
  "Not assigned": "ยังไม่ได้กำหนด",
  "Responsible faculty contact": "ผู้ประสานงานคณาจารย์",
  "Responsible faculty contacts": "ผู้ประสานงานคณาจารย์",
  "Physics Program facility": "ห้องปฏิบัติการสาขาวิชาฟิสิกส์",
  "Physics Program Research Facilities": "ห้องปฏิบัติการวิจัย สาขาวิชาฟิสิกส์",
  "Public equipment records linked to this facility.": "รายการเครื่องมือสาธารณะที่เชื่อมโยงกับห้องปฏิบัติการนี้",
  "Facility information is being verified by the Physics Program.": "ข้อมูลห้องปฏิบัติการอยู่ระหว่างการตรวจสอบโดยสาขาวิชาฟิสิกส์",
  "No public facilities yet": "ยังไม่มีห้องปฏิบัติการสาธารณะ",
  "Add a facility and link verified public equipment records to display it here.": "เพิ่มห้องปฏิบัติการและเชื่อมโยงเครื่องมือสาธารณะที่ตรวจสอบแล้วเพื่อแสดงในส่วนนี้",
  "Verified": "ตรวจสอบแล้ว",
  "Sample": "ตัวอย่าง",
  "Contact the facility for equipment capabilities and use cases.": "ติดต่อห้องปฏิบัติการเพื่อสอบถามความสามารถของเครื่องมือและตัวอย่างการใช้งาน",
  "Verify a registry record and mark it as a candidate for the public facility profile.": "ตรวจสอบรายการในระบบจัดการและกำหนดให้เป็นรายการสำหรับโปรไฟล์ห้องปฏิบัติการสาธารณะ",
  "No public equipment record currently has a contact email. Add one in the Equipment Registry.": "ยังไม่มีรายการเครื่องมือสาธารณะที่มีอีเมลติดต่อ กรุณาเพิ่มในระบบจัดการเครื่องมือ",
  "This equipment does not yet have a valid contact email.": "เครื่องมือนี้ยังไม่มีอีเมลติดต่อที่ถูกต้อง",
  "Responsible equipment contact": "ผู้รับผิดชอบเครื่องมือ",
  "Faculty contact": "ข้อมูลคณาจารย์",
  "Faculty profile": "โปรไฟล์คณาจารย์",
  "Faculty member": "คณาจารย์",
  "Physics faculty": "คณาจารย์ฟิสิกส์",
  "Highlights": "ผลงานเด่น",
  "Facilities": "ห้องปฏิบัติการ",
  "Linked systems": "ระบบที่เชื่อมโยง",
  "Open profile": "เปิดโปรไฟล์",
  "Try another expertise area or browse all faculty contacts.": "ลองเลือกด้านความเชี่ยวชาญอื่น หรือดูรายชื่อคณาจารย์ทั้งหมด",
  "Faculty contacts": "รายชื่อคณาจารย์",
  "linked system": "ระบบที่เชื่อมโยง",
  "No expertise map yet": "ยังไม่มีแผนที่ความเชี่ยวชาญ",
  "Browse faculty profiles above while this expertise map grows.": "ดูโปรไฟล์คณาจารย์ด้านบนระหว่างที่แผนที่ความเชี่ยวชาญนี้กำลังเพิ่มเติมข้อมูล",
  "Browse faculty contacts and research areas connected to the School of Physics.": "ดูรายชื่อคณาจารย์และด้านวิจัยที่เชื่อมโยงกับสาขาวิชาฟิสิกส์",
  "Browse faculty profiles and research contacts from the School of Physics.": "ดูโปรไฟล์คณาจารย์และช่องทางติดต่อด้านวิจัยของสาขาวิชาฟิสิกส์",
  "Research interests": "ความสนใจด้านวิจัย",
  "Skills and methods": "ทักษะและวิธีการ",
  "Close profile": "ปิดโปรไฟล์",
  "Student profile": "โปรไฟล์นักศึกษา",
  "Researcher profile": "โปรไฟล์นักวิจัย",
  "Program": "หลักสูตร",
  "Advisor role": "บทบาทอาจารย์ที่ปรึกษา",
  "Started": "เริ่มศึกษา",
  "Lab / group": "ห้องปฏิบัติการ / กลุ่มวิจัย",
  "Project": "โครงการ",
  "Thesis title": "หัวข้อวิทยานิพนธ์",
  "Role type": "ประเภทบทบาท",
  "Status": "สถานะ",
  "Host role": "บทบาทผู้ดูแล",
  "Funding": "ทุนหรือแหล่งสนับสนุน",
  "Appointment": "ช่วงเวลาปฏิบัติงาน",
  "Not listed": "ไม่ได้ระบุ",
  "Dates to be confirmed": "รอยืนยันช่วงเวลา",
  "Activities": "กิจกรรม",
  "Recognitions": "รางวัลหรือการยอมรับ",
  "Profile details will appear here as they become available.": "รายละเอียดโปรไฟล์จะแสดงที่นี่เมื่อมีข้อมูลเพิ่มเติม",
  "Faculty profile": "โปรไฟล์คณาจารย์",
  "Research infographic": "อินโฟกราฟิกงานวิจัย",
  "Biography and research interests will appear here as profile details are added.": "ประวัติและความสนใจด้านวิจัยจะแสดงที่นี่เมื่อมีการเพิ่มรายละเอียดโปรไฟล์",
  "Email faculty": "ส่งอีเมลถึงคณาจารย์",
  "Back to faculty directory": "กลับไปยังทำเนียบคณาจารย์",
  "Profile snapshot": "ภาพรวมโปรไฟล์",
  "research interests": "ความสนใจด้านวิจัย",
  "highlights": "ผลงานเด่น",
  "advisees": "นักศึกษาที่ดูแล",
  "Associated facilities help visitors understand where this faculty member's research and service activities connect.": "ห้องปฏิบัติการที่เกี่ยวข้องช่วยให้ผู้สนใจเข้าใจว่างานวิจัยและกิจกรรมบริการของคณาจารย์ท่านนี้เชื่อมโยงกับพื้นที่ใด",
  "Advisees": "นักศึกษาที่ดูแล",
  "Student": "นักศึกษา",
  "advisees.": "ที่อยู่ในการดูแล",
  "Student advisees.": "นักศึกษาที่อยู่ในการดูแล",
  "Verified public students listing this faculty member as primary advisor.": "นักศึกษาที่ผ่านการตรวจสอบและระบุคณาจารย์ท่านนี้เป็นอาจารย์ที่ปรึกษาหลัก",
  "No verified public advisees yet": "ยังไม่มีนักศึกษาที่ดูแลซึ่งแสดงสาธารณะ",
  "Student advisees will appear here after students opt in and faculty verification is complete.": "รายชื่อนักศึกษาที่ดูแลจะแสดงที่นี่หลังจากนักศึกษาเลือกให้แสดงสาธารณะและคณาจารย์ตรวจสอบข้อมูลเรียบร้อย",
  "Level": "ระดับการศึกษา",
  "Type": "ประเภท",
  "SUT external program": "หลักสูตรอื่นภายใน มทส.",
  "Primary advisor": "อาจารย์ที่ปรึกษาหลัก",
  "Co-advisor": "อาจารย์ที่ปรึกษาร่วม",
  "Committee member": "กรรมการที่ปรึกษา",
  "Research supervisor": "ผู้ดูแลงานวิจัย",
  "Academic links": "ลิงก์วิชาการ",
  "Profiles and": "โปรไฟล์และ",
  "research systems.": "ระบบวิจัย",
  "available metrics.": "ตัวชี้วัดที่มีอยู่",
  "These values are shown when refreshed Scopus data is not available.": "ค่าชุดนี้จะแสดงเมื่อยังไม่มีข้อมูล Scopus ที่อัปเดต",
  "Faculty-provided metrics": "ตัวชี้วัดจากคณาจารย์",
  "Use these links to explore the faculty member's academic profiles and research activity.": "ใช้ลิงก์เหล่านี้เพื่อสำรวจโปรไฟล์วิชาการและกิจกรรมวิจัยของคณาจารย์",
  "No academic profile links have been added yet.": "ยังไม่ได้เพิ่มลิงก์โปรไฟล์วิชาการ",
  "No linked equipment yet": "ยังไม่มีเครื่องมือที่เชื่อมโยง",
  "This profile can still be a starting point for expertise, supervision, or collaboration questions.": "โปรไฟล์นี้ยังเป็นจุดเริ่มต้นสำหรับคำถามด้านความเชี่ยวชาญ การดูแลนักศึกษา หรือความร่วมมือได้",
  "Service": "บริการ",
  "Available services": "บริการที่มี",
  "Service options are grouped by category so you can find the closest starting point.": "ตัวเลือกบริการจัดกลุ่มตามหมวดหมู่เพื่อให้เริ่มต้นค้นหาได้ง่าย",
  "To be confirmed": "รอยืนยัน",
  "By arrangement": "ตกลงตามความเหมาะสม",
  "School of Physics, SUT": "สาขาวิชาฟิสิกส์ มทส.",
  "Audience": "กลุ่มเป้าหมาย",
  "Duration": "ระยะเวลา",
  "Schedule": "กำหนดการ",
  "Fee": "ค่าบริการ",
  "Location": "สถานที่",
  "Contact": "ติดต่อ",
  "Contact to be confirmed": "ผู้ติดต่อรอยืนยัน",
  "Find faculty": "ค้นหาคณาจารย์",
  "Contact the School of Physics to discuss the scope, timing, and expected outcome for this service.": "ติดต่อสาขาวิชาฟิสิกส์เพื่อหารือขอบเขต ช่วงเวลา และผลลัพธ์ที่คาดหวังของบริการนี้",
  "Please select at least one service area.": "กรุณาเลือกประเภทบริการอย่างน้อยหนึ่งรายการ",
  "Your service request summary is ready to send.": "สรุปคำขอบริการพร้อมส่งแล้ว",
  "Physics students": "นักศึกษาฟิสิกส์",
  "Bachelor · Master · PhD": "ปริญญาตรี · ปริญญาโท · ปริญญาเอก",
  "Students shaping": "นักศึกษาผู้ร่วมสร้าง",
  "the future": "อนาคต",
  "Browse verified student profiles by study level, program, advisor, and research lab or group.": "ดูโปรไฟล์นักศึกษาที่ผ่านการตรวจสอบแล้วตามระดับการศึกษา หลักสูตร อาจารย์ที่ปรึกษา และห้องปฏิบัติการหรือกลุ่มวิจัย",
  "View students": "ดูรายชื่อนักศึกษา",
  "Open student portal": "เปิดพอร์ทัลนักศึกษา",
  "verified students": "นักศึกษาที่ตรวจสอบแล้ว",
  "Study levels": "ระดับการศึกษา",
  "Bachelor": "ปริญญาตรี",
  "Master": "ปริญญาโท",
  "PhD": "ปริญญาเอก",
  "verified profiles": "โปรไฟล์ที่ตรวจสอบแล้ว",
  "Verified student profiles will appear here after students opt in and faculty approve their record.": "โปรไฟล์นักศึกษาที่ตรวจสอบแล้วจะแสดงที่นี่เมื่อนักศึกษาเลือกให้แสดงสาธารณะและคณาจารย์อนุมัติข้อมูล",
  "Directory": "ทำเนียบ",
  "Student profiles": "โปรไฟล์นักศึกษา",
  "by program and year.": "ตามหลักสูตรและชั้นปี",
  "Use filters to scan study levels, degree programs, advisors, and research groups.": "ใช้ตัวกรองเพื่อค้นหาตามระดับการศึกษา หลักสูตร อาจารย์ที่ปรึกษา และกลุ่มวิจัย",
  "Use filters to scan study levels, degree programs, cohort years, advisors, and research groups.": "ใช้ตัวกรองเพื่อค้นหาตามระดับการศึกษา หลักสูตร ปีที่เริ่มศึกษา อาจารย์ที่ปรึกษา และกลุ่มวิจัย",
  "Filter students": "กรองนักศึกษา",
  "All levels": "ทุกระดับ",
  "Program": "หลักสูตร",
  "All programs": "ทุกหลักสูตร",
  "Start year": "ปีที่เริ่มศึกษา",
  "All years": "ทุกปี",
  "Term 1": "ภาคการศึกษาที่ 1",
  "Term 2": "ภาคการศึกษาที่ 2",
  "Term 3": "ภาคการศึกษาที่ 3",
  "Advisor": "อาจารย์ที่ปรึกษา",
  "All advisors": "อาจารย์ที่ปรึกษาทั้งหมด",
  "Lab / group": "ห้องปฏิบัติการ / กลุ่ม",
  "All groups": "ทุกกลุ่ม",
  "B.Sc. Physics": "วท.บ. ฟิสิกส์",
  "M.Sc. Physics": "วท.ม. ฟิสิกส์",
  "M.Sc. Applied Physics": "วท.ม. ฟิสิกส์ประยุกต์",
  "Ph.D. Physics": "ปร.ด. ฟิสิกส์",
  "Ph.D. Applied Physics": "ปร.ด. ฟิสิกส์ประยุกต์",
  "Program TBD": "หลักสูตรรอกำหนด",
  "TBD": "รอกำหนด",
  "Short bio coming soon.": "ประวัติย่อจะแสดงในเร็ว ๆ นี้",
  "Research topic to be announced": "หัวข้องานวิจัยจะแจ้งภายหลัง",
  "Project": "โครงการ",
  "Started": "เริ่มศึกษา",
  "Start TBD": "รอกำหนดวันเริ่มศึกษา",
  "Status": "สถานะ",
  "Active": "กำลังศึกษา",
  "Leave": "ลาพักการศึกษา",
  "Graduated": "สำเร็จการศึกษา",
  "Withdrawn": "พ้นสภาพ",
  "No students match these filters yet": "ยังไม่มีนักศึกษาที่ตรงกับตัวกรองนี้",
  "Try another study level, program, advisor, or group.": "ลองเลือกระดับการศึกษา หลักสูตร อาจารย์ที่ปรึกษา หรือกลุ่มอื่น",
  "Try another study level, program, year, advisor, or group.": "ลองเลือกระดับการศึกษา หลักสูตร ปีที่เริ่มศึกษา อาจารย์ที่ปรึกษา หรือกลุ่มอื่น",
  "No verified student profiles yet": "ยังไม่มีโปรไฟล์นักศึกษาที่ตรวจสอบแล้ว",
  "Students who opt in will appear here after faculty verification.": "นักศึกษาที่เลือกให้แสดงสาธารณะจะปรากฏที่นี่หลังจากคณาจารย์ตรวจสอบข้อมูล"
};

const attributeTranslations = {
  "A prototype infographic page for presenting academic research equipment, facilities, and collaboration pathways.": "หน้าต้นแบบสำหรับนำเสนอเครื่องมือวิจัย ห้องปฏิบัติการ และแนวทางความร่วมมือทางวิชาการ",
  "Faculty expertise and research contacts for the School of Physics research infrastructure at Suranaree University of Technology.": "ความเชี่ยวชาญและช่องทางติดต่อคณาจารย์สำหรับโครงสร้างพื้นฐานด้านการวิจัยของสาขาวิชาฟิสิกส์ มหาวิทยาลัยเทคโนโลยีสุรนารี",
  "Certified measurements, short courses, workshops, and STEM services from the School of Physics at Suranaree University of Technology.": "บริการการวัดที่รับรองได้ หลักสูตรระยะสั้น เวิร์กช็อป และกิจกรรม STEM จากสาขาวิชาฟิสิกส์ มหาวิทยาลัยเทคโนโลยีสุรนารี",
  "Verified student profiles from the School of Physics at Suranaree University of Technology.": "โปรไฟล์นักศึกษาที่ผ่านการตรวจสอบจากสาขาวิชาฟิสิกส์ มหาวิทยาลัยเทคโนโลยีสุรนารี",
  "Verified student profiles, advisors, programs, and research groups from the School of Physics at SUT.": "โปรไฟล์นักศึกษาที่ผ่านการตรวจสอบ อาจารย์ที่ปรึกษา หลักสูตร และกลุ่มวิจัยจากสาขาวิชาฟิสิกส์ มทส.",
  "Research facilities overview": "ภาพรวมโครงสร้างพื้นฐานด้านการวิจัย",
  "Student profile count indicator": "ตัวบ่งชี้จำนวนโปรไฟล์นักศึกษา",
  "Student level summary": "สรุประดับการศึกษาของนักศึกษา",
  "Filter students": "กรองนักศึกษา",
  "Describe your sample, measurement need, timeline, or research question.": "อธิบายตัวอย่าง ความต้องการด้านการวัด ช่วงเวลา หรือคำถามวิจัยของคุณ",
  "Describe the measurement, training topic, workshop theme, STEM activity, sample, audience, or problem you want help with.": "อธิบายการวัด หัวข้ออบรม ธีมเวิร์กช็อป กิจกรรม STEM ตัวอย่าง กลุ่มเป้าหมาย หรือปัญหาที่ต้องการให้ช่วย",
  "Examples: certificate, report, training completion, demonstration activity, measurement result, method advice.": "ตัวอย่าง: ใบรับรอง รายงาน การอบรมสำเร็จ กิจกรรมสาธิต ผลการวัด หรือคำแนะนำด้านวิธีการ",
  "e.g. 1, 12, 40 students": "เช่น 1 คน, 12 คน, นักเรียน 40 คน",
  "Name": "ชื่อ",
  "you@example.com": "you@example.com",
  "Company, laboratory, school, or institution": "บริษัท ห้องปฏิบัติการ โรงเรียน หรือสถาบัน"
};

const titleTranslations = {
  "Research Instruments & Facilities": "เครื่องมือและห้องปฏิบัติการวิจัย",
  "Faculty & Expertise · SUT Physics": "คณาจารย์และความเชี่ยวชาญ · ฟิสิกส์ มทส.",
  "Services · SUT Physics": "บริการ · ฟิสิกส์ มทส.",
  "Physics SUT Students · Bachelor, Master, and PhD Profiles": "นักศึกษาฟิสิกส์ มทส. · โปรไฟล์ปริญญาตรี โท และเอก"
};

const patternTranslations = [
  [/^(\d+) \/ (.+)$/, (number, label) => `${number} / ${translate(label)}`],
  [/^(\d+) public systems?$/, count => `${count} ระบบสาธารณะ`],
  [/^(\d+) faculty$/, count => `${count} คน`],
  [/^(\d+) linked systems?$/, count => `${count} ระบบที่เชื่อมโยง`],
  [/^Browse (\d+) faculty profiles? alongside broader School of Physics contacts\.$/, count => `ดูโปรไฟล์คณาจารย์ ${count} รายการ พร้อมรายชื่อคณาจารย์ในสาขาวิชาฟิสิกส์เพิ่มเติม`],
  [/^(\d+) faculty contacts? with (\d+) research interest areas? and (\d+) linked public systems?\.$/, (faculty, areas, systems) => `มีรายชื่อคณาจารย์ ${faculty} รายการ ความสนใจด้านวิจัย ${areas} ด้าน และระบบสาธารณะที่เชื่อมโยง ${systems} ระบบ`],
  [/^(\d+) service options? currently match visitor and partner needs\.$/, count => `มี ${count} ตัวเลือกบริการที่ตรงกับความต้องการของผู้สนใจและพันธมิตรในขณะนี้`],
  [/^(\d+) verified student profiles? currently available\.$/, count => `มีโปรไฟล์นักศึกษาที่ตรวจสอบแล้ว ${count} รายการ`],
  [/^Term ([1-3]), (\d{4})$/, (term, year) => `ภาคการศึกษาที่ ${term}, ${year}`],
  [/^Use the survey below to tell us what kind of (.+) support you need\.$/, area => `ใช้แบบสำรวจด้านล่างเพื่อบอกเราว่าคุณต้องการการสนับสนุนด้าน${translate(area)}แบบใด`],
  [/^Open (.+) full size$/, label => `เปิด ${label} แบบเต็มขนาด`],
  [/^(.+) — contact email needed$/, label => `${label} — ต้องเพิ่มอีเมลติดต่อ`],
  [/^Equipment: (.+)$/, value => `เครื่องมือ: ${value}`],
  [/^Facility: (.+)$/, value => `ห้องปฏิบัติการ: ${value}`],
  [/^From: (.+)$/, value => `จาก: ${value}`],
  [/^Email: (.+)$/, value => `อีเมล: ${value}`],
  [/^No public records in this category$/, () => "ยังไม่มีรายการสาธารณะในหมวดหมู่นี้"],
  [/^No services listed in this category yet$/, () => "ยังไม่มีบริการในหมวดหมู่นี้"],
  [/^No faculty profiles in this area yet$/, () => "ยังไม่มีโปรไฟล์คณาจารย์ในด้านนี้"]
];

const originalText = new WeakMap();
let lastAppliedTitle = "";
let currentLanguage = localStorage.getItem(SUT_LANGUAGE_KEY) === "th" ? "th" : "en";
let observer;
let applyQueued = false;

const translate = value => {
  const normalized = String(value || "").replace(/\s+/g, " ").trim();
  if (!normalized) return value;
  if (textTranslations[normalized]) return textTranslations[normalized];
  for (const [pattern, resolver] of patternTranslations) {
    const match = normalized.match(pattern);
    if (match) return resolver(...match.slice(1));
  }
  return value;
};

const translatePreservingSpace = value => {
  const leading = String(value).match(/^\s*/)?.[0] || "";
  const trailing = String(value).match(/\s*$/)?.[0] || "";
  return `${leading}${translate(value)}${trailing}`;
};

const applyText = root => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest("script, style, textarea")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const nextValue = currentLanguage === "th" ? translatePreservingSpace(source) : source;
    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
  });
};

const applyAttributes = root => {
  const attributes = ["aria-label", "placeholder", "title", "content"];
  root.querySelectorAll("*").forEach(element => {
    attributes.forEach(attribute => {
      if (!element.hasAttribute(attribute)) return;
      const key = `i18nOriginal${attribute.replace(/[^a-z]/gi, "")}`;
      if (!element.dataset[key]) element.dataset[key] = element.getAttribute(attribute);
      const source = element.dataset[key];
      const translated = attributeTranslations[source] || textTranslations[source] || translate(source);
      const nextValue = currentLanguage === "th" ? translated : source;
      if (element.getAttribute(attribute) !== nextValue) element.setAttribute(attribute, nextValue);
    });
  });
};

const setDocumentMeta = () => {
  document.documentElement.lang = currentLanguage === "th" ? "th" : "en";
  document.body?.setAttribute("data-language", currentLanguage);
  if (!document.documentElement.dataset.originalTitle || document.title !== lastAppliedTitle) {
    document.documentElement.dataset.originalTitle = document.title;
  }
  const originalTitle = document.documentElement.dataset.originalTitle || document.title;
  document.documentElement.dataset.originalTitle = originalTitle;
  const profileMatch = originalTitle.match(/^(.+) · Faculty Profile$/);
  const translatedTitle = profileMatch ? `${profileMatch[1]} · โปรไฟล์คณาจารย์` : titleTranslations[originalTitle] || originalTitle;
  document.title = currentLanguage === "th" ? translatedTitle : originalTitle;
  lastAppliedTitle = document.title;
};

const updateSwitch = () => {
  document.querySelectorAll("[data-language-option]").forEach(button => {
    const active = button.dataset.languageOption === currentLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
};

const applyLanguage = () => {
  if (!document.body) return;
  setDocumentMeta();
  applyText(document.body);
  applyAttributes(document);
  updateSwitch();
};

const queueApply = () => {
  if (applyQueued) return;
  applyQueued = true;
  requestAnimationFrame(() => {
    applyQueued = false;
    applyLanguage();
  });
};

const setLanguage = language => {
  currentLanguage = language === "th" ? "th" : "en";
  localStorage.setItem(SUT_LANGUAGE_KEY, currentLanguage);
  applyLanguage();
  window.dispatchEvent(new CustomEvent("sut-language-change", { detail: { language: currentLanguage } }));
};

const injectSwitch = () => {
  const header = document.querySelector(".site-header");
  const identity = header?.querySelector(".identity");
  const navigation = document.querySelector("#site-nav");
  if (!header || !identity || !navigation || header.querySelector(".language-switch")) return;
  const switcher = document.createElement("div");
  switcher.className = "language-switch";
  switcher.setAttribute("aria-label", "Language");
  switcher.innerHTML = `
    <button type="button" data-language-option="en" aria-pressed="false">EN</button>
    <button type="button" data-language-option="th" aria-pressed="false">ไทย</button>
  `;
  identity.after(switcher);
  switcher.addEventListener("click", event => {
    const button = event.target.closest("[data-language-option]");
    if (button) setLanguage(button.dataset.languageOption);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  injectSwitch();
  applyLanguage();
  observer = new MutationObserver(queueApply);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
});

window.SUTI18n = {
  language: () => currentLanguage,
  setLanguage,
  apply: applyLanguage,
  translate
};
