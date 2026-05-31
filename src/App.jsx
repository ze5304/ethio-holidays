import { useState } from "react";

function App() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2018);

  // ==================== የክርስትና በዓላት ====================
  const christianHolidays = [
    { name: "አደራ (ኢትዮጵያ አዲስ አመት)", ethMonth: 1, ethDay: 1, desc: "የኢትዮጵያ አዲስ አመት እና ትርቱ በዓል" },
    { name: "መስቀል", ethMonth: 1, ethDay: 17, desc: "እግዚአብሔር መስቀል መገለጥ" },
    { name: "እንቁጣጣሽ (ልደት)", ethMonth: 4, ethDay: 28, desc: "የኢየሱስ ክርስቶስ ልደት" },
    { name: "ጥምቀት", ethMonth: 5, ethDay: 11, desc: "የኢየሱስ ክርስቶስ ጥምቀት" },
    { name: "ደብረ ታቦር", ethMonth: 13, ethDay: 1, desc: "የኢየሱስ ትራንስፊጉሬሽን" },
    { name: "ሆሳዕና", ethMonth: 8, ethDay: 15, desc: "የዘንባባ እሁድ" },
    { name: "ስቅለት", ethMonth: 8, ethDay: 19, desc: "የኢየሱስ ስቅለት" },
    { name: "ትንሣኤ (ፋሲካ)", ethMonth: 8, ethDay: 21, desc: "የኢየሱስ ትንሣኤ" }
  ];

  // ==================== ሀገራዊ በዓላት ====================
  const nationalHolidays = [
    { name: "የድል በዓል (አድዋ)", ethMonth: 12, ethDay: 23, desc: "የአድዋ ድል መታሰቢያ - የካቲት 23" },
    { name: "የሰራተኞች ቀን", ethMonth: 2, ethDay: 1, desc: "ዓለም አቀፍ የሰራተኞች ቀን - ግንቦት 1" },
    { name: "የአርብቶ አደር ቀን", ethMonth: 4, ethDay: 5, desc: "የአርብቶ አደር ማህበረሰብ ቀን - ታህሳስ 5" },
    { name: "የላብ አደር ቀን", ethMonth: 11, ethDay: 15, desc: "የላብ አደር ማህበረሰብ ቀን - የካቲት 15" },
    { name: "የኢትዮጵያ ሴቶች ቀን", ethMonth: 3, ethDay: 8, desc: "ዓለም አቀፍ የሴቶች ቀን - መጋቢት 8" }
  ];

  // ==================== የሙስሊም በዓላት (ከቀን ክልል ጋር) ====================
  // የመሠረት ቀናት (በ2018 ኢትዮጵያ ዓመት)
  const baseYear = 2018;
  const baseDates = {
    "የረመዳን መጀመሪያ": { month: 6, day: 20 },     // ሰኔ 20, 2018
    "ዒድ አልፈጥር (የጾም ፍቺ)": { month: 7, day: 10 },   // ሃምሌ 10, 2018
    "ዒድ አልአድሓ (መስዋእት)": { month: 9, day: 19 },    // መስከረም 19, 2018
    "የሂጅራ አዲስ አመት": { month: 1, day: 1 },       // መስከረም 1 (በግምት)
    "መውሊድ (የነቢዩ ልደት)": { month: 3, day: 12 }     // ህዳር 12 (በግምት)
  };

  // በየአመቱ 10 ቀናት ቀድሞ ለማስላት (ከቀን ክልል ጋር)
  const calculateMuslimDateRange = (baseMonth, baseDay, targetYear) => {
    const yearDiff = targetYear - baseYear;
    const daysToSubtract = yearDiff * 10;
    
    let expectedDay = baseDay - daysToSubtract;
    let expectedMonth = baseMonth;
    
    // ቀኑ ከ0 በታች ከሆነ ወሩን መቀነስ
    while (expectedDay <= 0) {
      expectedMonth--;
      if (expectedMonth < 1) {
        expectedMonth = 13;
      }
      expectedDay += 30;
    }
    
    // ቀኑ ከ30 በላይ ከሆነ ወሩን መጨመር
    while (expectedDay > 30) {
      expectedMonth++;
      if (expectedMonth > 13) {
        expectedMonth = 1;
      }
      expectedDay -= 30;
    }
    
    // የቀን ክልል (ሊሆን የሚችለው ቀን ±1)
    let startDay = expectedDay - 1;
    let startMonth = expectedMonth;
    let endDay = expectedDay + 1;
    let endMonth = expectedMonth;
    
    // የመጀመሪያውን ቀን አስተካክል
    if (startDay < 1) {
      startMonth--;
      if (startMonth < 1) startMonth = 13;
      startDay = 30;
    }
    
    // የመጨረሻውን ቀን አስተካክል
    if (endDay > 30) {
      endMonth++;
      if (endMonth > 13) endMonth = 1;
      endDay = 1;
    }
    
    return {
      expectedMonth,
      expectedDay,
      startMonth,
      startDay,
      endMonth,
      endDay
    };
  };

  // የሙስሊም በዓላት ዝርዝር (ከቀን ክልል ጋር)
  const getMuslimHolidaysForYear = (year) => {
    const holidays = [];
    
    for (const [name, date] of Object.entries(baseDates)) {
      const range = calculateMuslimDateRange(date.month, date.day, year);
      holidays.push({
        name: name,
        expectedMonth: range.expectedMonth,
        expectedDay: range.expectedDay,
        startMonth: range.startMonth,
        startDay: range.startDay,
        endMonth: range.endMonth,
        endDay: range.endDay,
        desc: getDescriptionForHoliday(name)
      });
    }
    
    return holidays;
  };
  
  const getDescriptionForHoliday = (name) => {
    const descriptions = {
      "የረመዳን መጀመሪያ": "የተቀደሰ የጾም ወር መጀመሪያ - በጨረቃ እይታ ይወሰናል",
      "ዒድ አልፈጥር (የጾም ፍቺ)": "የረመዳን መጨረሻ በዓል - በጨረቃ እይታ ይወሰናል",
      "ዒድ አልአድሓ (መስዋእት)": "የመስዋእት በዓል - ሐጅ ማጠናቀቂያ - በጨረቃ እይታ ይወሰናል",
      "የሂጅራ አዲስ አመት": "የኢስላማዊ አዲስ አመት - በጨረቃ እይታ ይወሰናል",
      "መውሊድ (የነቢዩ ልደት)": "የነቢዩ መሐመድ ልደት - በጨረቃ እይታ ይወሰናል"
    };
    return descriptions[name] || "በጨረቃ እይታ ላይ የተመሰረተ በዓል";
  };

  const ethiopianMonths = [
    "መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት",
    "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሃምሌ", "ነሐሴ", "ጳጉሜ"
  ];

  const getEthiopianDateDisplay = (month, day) => {
    if (month < 1 || month > 13) return `ቀን ማስላት አልተቻለም`;
    return `${ethiopianMonths[month - 1]} ${day} ቀን`;
  };

  const getDateRangeDisplay = (startMonth, startDay, endMonth, endDay) => {
    const start = getEthiopianDateDisplay(startMonth, startDay);
    const end = getEthiopianDateDisplay(endMonth, endDay);
    
    if (startMonth === endMonth && startDay === endDay) {
      return start;
    }
    
    return `${start} - ${end}`;
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedHoliday(null);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setSelectedHoliday(null);
  };

  const showChristianHoliday = (holiday) => {
    setSelectedHoliday({
      name: holiday.name,
      date: getEthiopianDateDisplay(holiday.ethMonth, holiday.ethDay),
      desc: holiday.desc,
      type: "christian",
      isRange: false
    });
  };

  const showNationalHoliday = (holiday) => {
    setSelectedHoliday({
      name: holiday.name,
      date: getEthiopianDateDisplay(holiday.ethMonth, holiday.ethDay),
      desc: holiday.desc,
      type: "national",
      isRange: false
    });
  };

  const showMuslimHoliday = (holiday) => {
    const dateRange = getDateRangeDisplay(holiday.startMonth, holiday.startDay, holiday.endMonth, holiday.endDay);
    const expectedDate = getEthiopianDateDisplay(holiday.expectedMonth, holiday.expectedDay);
    
    setSelectedHoliday({
      name: holiday.name,
      date: dateRange,
      expectedDate: expectedDate,
      desc: holiday.desc,
      type: "muslim",
      isRange: true,
      note: `በ${selectedYear} ዓ.ም (${selectedYear + 7}/${selectedYear + 8} እ.ኤ.አ)`
    });
  };

  const currentMuslimHolidays = getMuslimHolidaysForYear(selectedYear);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ color: "#0a5e1a", textAlign: "center" }}>
        🇪🇹 ዘላቂ የኢትዮጵያ በዓላት መቁጠሪያ
      </h1>

      {/* የአመት መምረጫ */}
      <div style={{ textAlign: "center", marginBottom: "20px", backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
        <label style={{ fontWeight: "bold" }}>ዓመቱን ይምረጡ (ኢትዮጵያ ዘመን): </label>
        <input 
          type="number" 
          value={selectedYear} 
          onChange={handleYearChange}
          min={1900}
          max={2030}
          step="1"
          style={{ padding: "5px", marginLeft: "10px", borderRadius: "5px", width: "80px" }}
        />
        <p style={{ fontSize: "12px", marginTop: "5px" }}>
          💡 ማስታወሻ: የሙስሊም በዓላት በየአመቱ ~10 ቀናት ይቀድማሉ፣ እና በጨረቃ እይታ ምክንያት ±1 ቀን ሊለያይ ይችላል
        </p>
      </div>

      {/* የምርጫ ቁልፎች */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "20px 0", flexWrap: "wrap" }}>
        <button onClick={() => handleTypeClick("christian")} style={{ ...buttonStyle, backgroundColor: "#1a6b1a" }}>
          ⛪ የክርስትና በዓላት
        </button>
        <button onClick={() => handleTypeClick("muslim")} style={{ ...buttonStyle, backgroundColor: "#b8860b" }}>
          ☪️ የሙስሊም በዓላት
        </button>
        <button onClick={() => handleTypeClick("national")} style={{ ...buttonStyle, backgroundColor: "#0a5e1a" }}>
          🇪🇹 ሀገራዊ በዓላት
        </button>
      </div>

      {/* የክርስትና በዓላት */}
      {selectedType === "christian" && (
        <div style={listContainerStyle}>
          <h2>⛪ የክርስትና በዓላት</h2>
          <p style={{ backgroundColor: "#d4edda", padding: "8px", borderRadius: "5px", marginBottom: "15px", fontSize: "14px" }}>
            ✅ እነዚህ በዓላት ቋሚ ቀናት አሏቸው - ሙሉ በሙሉ ትክክለኛ ናቸው
          </p>
          {christianHolidays.map((h) => (
            <div key={h.name} onClick={() => showChristianHoliday(h)} style={listItemStyle}>
              <strong>{h.name}</strong>
              <p style={descStyle}>{h.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* የሙስሊም በዓላት */}
      {selectedType === "muslim" && (
        <div style={listContainerStyle}>
          <h2>☪️ የሙስሊም በዓላት - ለ{selectedYear} ዓ.ም</h2>
          <p style={{ backgroundColor: "#fff3cd", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
            ⚠️ እነዚህ ቀናት በጨረቃ እይታ ላይ የተመሰረቱ በመሆኑ ከዚህ በታች በሚታየው የቀን ክልል ውስጥ ይጠበቃሉ።
          </p>
          {currentMuslimHolidays.map((h) => (
            <div key={h.name} onClick={() => showMuslimHoliday(h)} style={listItemStyle}>
              <strong>{h.name}</strong>
              <p style={descStyle}>{h.desc}</p>
              <p style={{ fontSize: "12px", color: "#b8860b", marginTop: "5px" }}>
                📅 የሚጠበቅ: {getEthiopianDateDisplay(h.expectedMonth, h.expectedDay)} ±1 ቀን
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ሀገራዊ በዓላት */}
      {selectedType === "national" && (
        <div style={listContainerStyle}>
          <h2>🇪🇹 ሀገራዊ በዓላት</h2>
          <p style={{ backgroundColor: "#d4edda", padding: "8px", borderRadius: "5px", marginBottom: "15px", fontSize: "14px" }}>
            ✅ እነዚህ በዓላት ቋሚ ቀናት አሏቸው
          </p>
          {nationalHolidays.map((h) => (
            <div key={h.name} onClick={() => showNationalHoliday(h)} style={listItemStyle}>
              <strong>{h.name}</strong>
              <p style={descStyle}>{h.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* የተመረጠው በዓል ዝርዝር */}
      {selectedHoliday && (
        <div style={{
          marginTop: "30px",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: selectedHoliday.type === "muslim" ? "#fff3cd" : "#d4edda",
          border: `2px solid ${selectedHoliday.type === "muslim" ? "#b8860b" : "#0a5e1a"}`
        }}>
          <h2>📌 {selectedHoliday.name}</h2>
          
          {selectedHoliday.isRange ? (
            <>
              <p><strong>📅 የሚጠበቅ የቀን ክልል:</strong> {selectedHoliday.date}</p>
              <p><strong>🎯 ማዕከላዊ ግምት:</strong> {selectedHoliday.expectedDate}</p>
              <p><strong>⚠️ ልዩነት:</strong> በጨረቃ እይታ ምክንያት ከላይ ባለው ቀን ክልል ውስጥ በማንኛውም ቀን ሊከበር ይችላል</p>
            </>
          ) : (
            <p><strong>📅 ቀን:</strong> {selectedHoliday.date}</p>
          )}
          
          <p><strong>📖 መግለጫ:</strong> {selectedHoliday.desc}</p>
          
          {selectedHoliday.type === "muslim" && selectedHoliday.note && (
            <p><strong>📆 ዘመን:</strong> {selectedHoliday.note}</p>
          )}
          
          {selectedHoliday.type === "muslim" && (
            <p style={{ fontSize: "14px", marginTop: "10px", color: "#856404" }}>
              💡 ምክር: ትክክለኛውን ቀን ለማወቅ እባክዎ ከአካባቢዎ መስጊድ ይጠይቁ ወይም የጨረቃ እይታ ዜና ይከታተሉ።
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold"
};

const listContainerStyle = {
  marginTop: "20px",
  padding: "15px",
  backgroundColor: "#f9f5e8",
  borderRadius: "12px"
};

const listItemStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "12px",
  margin: "8px 0",
  cursor: "pointer",
  backgroundColor: "white",
  transition: "0.3s"
};

const descStyle = {
  fontSize: "14px",
  margin: "5px 0 0 0",
  color: "#555"
};

export default App;