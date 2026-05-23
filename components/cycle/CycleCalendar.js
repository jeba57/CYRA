"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DAYS_OF_WEEK = [
  "SU",
  "MO",
  "TU",
  "WE",
  "TH",
  "FR",
  "SA",
];

// FLOW COLORS

const FLOW_STYLES = {
  0: "linear-gradient(135deg,#D96C7B,#C44569)",
  1: "linear-gradient(135deg,#C44569,#A4133C)",
  2: "linear-gradient(135deg,#E08A98,#C44569)",
  3: "linear-gradient(135deg,#F2B5BD,#E08A98)",
  4: "linear-gradient(135deg,#F9D6DB,#F2B5BD)",
  5: "linear-gradient(135deg,#FAE3E6,#F7CDD3)",
  6: "linear-gradient(135deg,#FCEBED,#F8DADF)",
  7: "linear-gradient(135deg,#FFF2F4,#FCE5E8)",
  8: "linear-gradient(135deg,#FFF5F6,#FDECEF)",
  9: "linear-gradient(135deg,#FFF8F9,#FEF2F4)",
};

function getDayStyle(
  type,
  isToday,
  flowIndex,
  preview
) {

  const base = {
    aspectRatio: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontSize: "0.98rem",
    cursor: "pointer",
    transition: "all 0.25s ease",
    position: "relative",
    border: isToday
      ? "2px solid #C8909A"
      : "2px solid transparent",
  };

  // PREVIEW

  if (preview) {
    return {
      ...base,
      background: "rgba(200,144,154,0.15)",
      border: "2px dashed #C8909A",
      color: "#C44569",
    };
  }

  // PERIOD

  if (type === "period") {
    return {
      ...base,
      background:
        FLOW_STYLES[flowIndex] ||
        FLOW_STYLES[9],

      color:
        flowIndex >= 7
          ? "#C44569"
          : "#fff",

      fontWeight: 700,
    };
  }

  // OVULATION

  if (type === "ovulation") {
    return {
      ...base,
      background:
        "linear-gradient(135deg,#E8E0F5,#9B7BB8)",

      color: "#fff",
      fontWeight: 700,
    };
  }

  // FERTILE

  if (type === "fertile") {
    return {
      ...base,
      background:
        "linear-gradient(135deg,#C8EEE8,#9DDDD0)",

      color: "#3D2840",
      fontWeight: 600,
    };
  }

  // NORMAL

  return {
    ...base,
    color: "#6B4E6E",
  };
}

export default function CycleCalendar() {

  const today = new Date();

  const currentDay =
    today.getDate();

  // STATES

  const [previewStart, setPreviewStart] =
    useState(null);

  const [periodStart, setPeriodStart] =
    useState(null);

  const [periodEnd, setPeriodEnd] =
    useState(null);

  const [cycleHistory, setCycleHistory] =
    useState([]);

  const [cycleLength, setCycleLength] =
    useState(28);

  // LOAD STORAGE

  useEffect(() => {

    const saved = JSON.parse(
      localStorage.getItem("cycleData")
    );

    if (saved) {

      setPeriodStart(
        saved.periodStart
      );

      setPeriodEnd(
        saved.periodEnd
      );

      setCycleHistory(
        saved.cycleHistory || []
      );

      setCycleLength(
        saved.cycleLength || 28
      );
    }

  }, []);

  // SAVE STORAGE

  useEffect(() => {

    localStorage.setItem(
      "cycleData",

      JSON.stringify({
        periodStart,
        periodEnd,
        cycleHistory,
        cycleLength,
      })
    );

  }, [
    periodStart,
    periodEnd,
    cycleHistory,
    cycleLength,
  ]);

  // SINGLE CLICK = PREVIEW

  function handleSingleClick(day) {
    setPreviewStart(day);
  }

  // DOUBLE CLICK = CONFIRM START DATE

  function handleDoubleClick(day) {

    // PREVIOUS CYCLE EXISTS

    if (
      cycleHistory.length > 0
    ) {

      const previousCycle =
        cycleHistory[
          cycleHistory.length - 1
        ];

      // REAL CYCLE LENGTH

      const calculatedLength =
        day -
        previousCycle.start;

      // SAFETY RANGE

      if (
        calculatedLength >= 20 &&
        calculatedLength <= 40
      ) {

        setCycleLength(
          calculatedLength
        );
      }
    }

    // SAVE NEW START

    setPeriodStart(day);

    setPreviewStart(null);

    // DEFAULT 5 DAY PERIOD

    setPeriodEnd(day + 4);
  }

  // CONFIRM REAL END DATE

  function handleEndDate(day) {

    if (day >= periodStart) {

      setPeriodEnd(day);

      // SAVE COMPLETE CYCLE

      const updatedHistory = [
        ...cycleHistory,

        {
          start: periodStart,
          end: day,
        },
      ];

      setCycleHistory(
        updatedHistory
      );
    }
  }

  // PERIOD DAYS

  const periodDays =
    periodStart !== null &&
    periodEnd !== null

      ? Array.from(
          {
            length:
              periodEnd -
              periodStart +
              1,
          },

          (_, i) =>
            periodStart + i
        )

      : [];

  // ACTIVE CYCLE LENGTH

  let activeCycleLength =
    cycleLength || 28;

  // FIRST MONTH DEFAULT

  if (cycleHistory.length === 0) {
    activeCycleLength = 28;
  }

  // OVULATION

  const ovulationDay =
    periodStart !== null

      ? periodStart +
        activeCycleLength -
        14

      : null;

  // FERTILE WINDOW

  const fertileDays =
    ovulationDay !== null

      ? Array.from(
          { length: 6 },

          (_, i) =>
            ovulationDay - 3 + i
        )

      : [];

  // GENERATE CALENDAR

  const days = [];

  for (let d = 1; d <= 31; d++) {

    let type = "normal";

    let flowIndex = null;

    if (periodDays.includes(d)) {

      type = "period";

      flowIndex =
        d - periodStart;
    }

    else if (d === ovulationDay) {
      type = "ovulation";
    }

    else if (
      fertileDays.includes(d)
    ) {
      type = "fertile";
    }

    days.push({
      day: d,
      type,
      flowIndex,
      isToday:
        d === currentDay,
    });
  }

  return (
    <section
      style={{
       padding: "7rem 4rem 4rem",

    position: "relative",

    overflow: "hidden",
        background:
"radial-gradient(circle at top left, rgba(255,255,255,0.85), transparent 35%), radial-gradient(circle at right, rgba(232,224,245,0.7), transparent 40%), linear-gradient(135deg,#FDF8F3,#F8E5E7,#EDE0F5)"
      }}

      
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >

        {/* FLOATING TOP CONTENT */}
<motion.div
  style={{
    position: "absolute",

    top: "-180px",

    right: "-180px",

    width: "420px",

    height: "420px",

    borderRadius: "50%",

    background:
      "radial-gradient(circle,rgba(232,224,245,0.55),transparent 70%)",

    pointerEvents: "none",
  }}

  animate={{
    scale: [1, 1.05, 1],
  }}

  transition={{
    duration: 8,
    repeat: Infinity,
  }}
/>
<div
  style={{
    maxWidth: "900px",
    margin: "0 auto 1.8rem",
  }}
>

  {/* SMALL TAG */}

  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      position: "relative",
overflow: "hidden",

      background:
        "rgba(255,255,255,0.42)",

      backdropFilter: "blur(12px)",

      border:
        "1px solid rgba(255,255,255,0.55)",

      borderRadius: "999px",

      padding: "0.42rem 1rem",

      fontSize: "0.74rem",

      fontWeight: 700,

      letterSpacing: "0.06em",

      color: "#C8909A",

      marginBottom: "1.2rem",
    }}
  >
    🌙 MY CYCLE
  </div>

  {/* TITLE */}

  <h1
    style={{
      fontFamily:
        "var(--font-cormorant),serif",

      fontSize:
        "clamp(2rem,3vw,3rem)",

      fontWeight: 400,

      lineHeight: 1.15,

      color: "#3D2840",

      marginBottom: "0.9rem",
    }}
  >
    Track your cycle gently.
  </h1>

  {/* DESCRIPTION */}

  <p
    style={{
      color: "#6B4E6E",

      fontSize: "0.95rem",

      lineHeight: 1.8,

      maxWidth: "540px",
    }}
  >
    Understand your rhythm,
    period days, fertile window,
    and ovulation in one calm
    space.
  </p>

</div>

{/* MAIN CALENDAR CARD */}

<motion.div

  initial={{
    opacity: 0,
    y: 24,
  }}

  whileInView={{
    opacity: 1,
    y: 0,
  }}

  viewport={{
    once: true,
  }}

  transition={{
    duration: 0.7,
  }}

  style={{
    background:
      "linear-gradient(135deg,rgba(255,255,255,0.52),rgba(245,237,230,0.82))",

    borderRadius: "28px",

    padding: "2.5rem",

    boxShadow:
      "0 35px 90px rgba(61,40,64,0.14)",

    backdropFilter: "blur(18px)",

    border:
      "1px solid rgba(255,255,255,0.6)",
  }}
>
          {/* WEEK DAYS */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(7,1fr)",

              textAlign: "center",

              marginBottom: "0.75rem",
            }}
          >

            {DAYS_OF_WEEK.map((d) => (
              <span
                key={d}

                style={{
                  fontSize: "0.7rem",

                  fontWeight: 700,

                  color: "#9B7B9E",

                  letterSpacing:
                    "0.06em",
                }}
              >
                {d}
              </span>
            ))}

          </div>

          {/* CALENDAR */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(7,1fr)",

              gap: "4px",
            }}
          >

            {days.map((item, i) => (

              <div
                key={i}

                style={{
                  ...getDayStyle(
                    item.type,
                    item.isToday,
                    item.flowIndex,
                    previewStart ===
                      item.day
                  ),
                }}

                onClick={() =>
                  handleSingleClick(
                    item.day
                  )
                }

                onDoubleClick={() =>
                  handleDoubleClick(
                    item.day
                  )
                }

                title={
                  item.type ===
                  "period"

                    ? `Period Day ${
                        item.flowIndex +
                        1
                      }`

                    : item.type ===
                      "ovulation"

                    ? "Ovulation Phase"

                    : item.type ===
                      "fertile"

                    ? "Fertile Window"

                    : "Normal Day"
                }

                onMouseEnter={(e) => {

                  if (
                    item.type ===
                    "normal"
                  ) {

                    e.currentTarget.style.background =
                      "#F7D6D0";
                  }
                }}

                onMouseLeave={(e) => {

                  if (
                    item.type ===
                    "normal"
                  ) {

                    e.currentTarget.style.background =
                      "transparent";
                  }
                }}
              >

                {item.day}

                {/* BLOOD DROP */}

                {item.day ===
                  periodStart && (

                  <div
                    style={{
                      position:
                        "absolute",

                      top: "-6px",

                      right: "-2px",

                      fontSize:
                        "0.72rem",
                    }}
                  >
                    🩸
                  </div>
                )}

              </div>
            ))}

          </div>

          {/* INFO */}

          {periodStart && (

            <div
              style={{
                marginTop: "2rem",

                display: "flex",

                flexWrap: "wrap",

                gap: "1rem",
              }}
            >

              <div
                style={{
                  background: "#fff",

                  padding:
                    "0.8rem 1rem",

                  borderRadius:
                    "14px",

                  fontSize:
                    "0.82rem",

                  color: "#6B4E6E",
                }}
              >
                🌸 Period Started:
                Day {periodStart}
              </div>

              <div
                style={{
                  background: "#fff",

                  padding:
                    "0.8rem 1rem",

                  borderRadius:
                    "14px",

                  fontSize:
                    "0.82rem",

                  color: "#6B4E6E",
                }}
              >
                🩸 Period End:
                Day {periodEnd}
              </div>

              <div
                style={{
                  background: "#fff",

                  padding:
                    "0.8rem 1rem",

                  borderRadius:
                    "14px",

                  fontSize:
                    "0.82rem",

                  color: "#6B4E6E",
                }}
              >
                🌙 Cycle Length:
                {activeCycleLength} days
              </div>

              <div
                style={{
                  background: "#fff",

                  padding:
                    "0.8rem 1rem",

                  borderRadius:
                    "14px",

                  fontSize:
                    "0.82rem",

                  color: "#6B4E6E",
                }}
              >
                ✨ Ovulation:
                Day {ovulationDay}
              </div>

              <div
                style={{
                  background: "#fff",

                  padding:
                    "0.8rem 1rem",

                  borderRadius:
                    "14px",

                  fontSize:
                    "0.82rem",

                  color: "#6B4E6E",
                }}
              >
                🌿 Fertile Window:
                Days{" "}
                {
                  fertileDays[0]
                }
                –
                {
                  fertileDays[
                    fertileDays.length -
                      1
                  ]
                }
              </div>

            </div>
          )}

          {/* END DATE */}

          {periodStart && (

            <div
              style={{
                marginTop: "2rem",

                background:
                  "rgba(255,255,255,0.7)",

                padding: "1.2rem",

                borderRadius: "20px",
              }}
            >

              <p
                style={{
                  fontSize: "0.9rem",

                  color: "#6B4E6E",

                  marginBottom: "0.8rem",
                }}
              >
                If your period ended
                earlier or later,
                tap the actual last
                day below.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >

                {Array.from(
                  { length: 10 },

                  (_, i) =>
                    periodStart + i
                ).map((day) => (

                  <button
                    key={day}

                    onClick={() =>
                      handleEndDate(day)
                    }

                    style={{
                      width: "52px",

                      height: "52px",

                      borderRadius:
                        "50%",

                      border:
                        day ===
                        periodEnd

                          ? "none"

                          : "1px solid #E0C9CD",

                      background:
                        day ===
                        periodEnd

                          ? "#C44569"

                          : "#fff",

                      color:
                        day ===
                        periodEnd

                          ? "#fff"

                          : "#6B4E6E",

                      cursor:
                        "pointer",

                      fontSize:
                        "0.8rem",

                      display: "flex",

                      flexDirection:
                        "column",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      lineHeight: 1,
                    }}
                  >

                    {/* SMALL DAY */}

                    <span
                      style={{
                        fontSize:
                          "0.42rem",

                        opacity: 0.65,

                        marginBottom:
                          "2px",

                        fontWeight: 600,
                      }}
                    >
                      {day -
                        periodStart +
                        1}
                      th
                    </span>

                    {/* REAL DATE */}

                    <span
                      style={{
                        fontSize:
                          "0.82rem",

                        fontWeight: 600,
                      }}
                    >
                      {day}
                    </span>

                  </button>

                ))}

              </div>

            </div>
          )}

        </motion.div>
      </div>
    </section>
  );
}