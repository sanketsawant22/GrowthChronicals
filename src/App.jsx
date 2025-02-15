import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const data = [
  {
    year: 2023,
    details: [
      "Launched Raaya by Atmosphere, our first hospitality project in the Maldives",
      "Launched Eleven West office park in Baner",
      "Acquired Brownfield Hotel in Varanasi, Uttar Pradesh, and Aloft Bengaluru Whitefield Hotel in Karnataka",
    ],
  },
  {
    year: 2022,
    details: [
      "Commenced construction of Panchshil Business Hub and Panchshil Vantage office parks in Kharadi, Pune",
    ],
  },
  {
    year: 2021,
    details: ["Commenced construction of EON West I & II office park in Wakad"],
  },
  {
    year: 2020,
    details: [
      "Launched SOHO (Small Office Home Office) In Kharadi",
      "Commenced construction of Panchshil Business park in Viman Nagar",
    ],
  },
  {
    year: 2019,
    details: [
      "Launched EON Free Zone Phase || in Kharadi",
      "Launched The Ritz-Carlton, Pune",
    ],
  },
  {
    year: 2018,
    details: [
      "Launched the world's first-ever YOO branded villas - YOO villas styled by Kelly Hoppen CBE in Kharadi",
    ],
  },
  {
    year: 2016,
    details: [
      'Re-branded Oakwood Premier to "Marriott Suites',
      "Commenced construction of the second SEZ EON Free Zone Phase II in Kharadi",
    ],
  },
  {
    year: 2015,
    details: [
      "Signed an MOU with the Government of Maharashtra to develop 4 IT projects jointly with Blackstone Group across Mumbai and Pune",
      "Launched Avant Garde our first premium residences in Friends Colony, New Delhi",
    ],
  },
  {
    year: 2014,
    details: [
      "Delivered built-to-suit office park for Cumm India (Panchshil Business Park - Phase I) in Balewadi",
      "Acquired Mumbai's iconic Express Towers in Nariman Point with Blackstone",
      "Delivered Business Bay, a mixed-use development, is located near the Pune Golf Course on Airport Road",
    ],
  },
  {
    year: 2013,
    details: [
      "Upgraded Pune Marriott Hotel and Convent Centre to JW Marriott Hotel Pune",
      "Launched DoubleTree by Hilton Pune -Chinchwad",
      "Launched the first Trump-branded residences in India - Trump Towers in Kalyani Nagar",
    ],
  },
  {
    year: 2012,
    details: [
      "Launched Panchshil's first home-branded premium high-rise residential project: Panchshil Towers in Kharadi",
    ],
  },
  {
    year: 2010,
    details: [
      "Launched Pune Marriott Hotel and Convent Centre in Senapati Bapat Road",
      "Launched the first internationally-branded residence, yoopune by Philippe Starck, in Hadapsar",
      "Launched Pune's only World Trade Center in Kharadi",
    ],
  },
  {
    year: 2007,
    details: [
      "Launched Oakwood Residence the first internationally-branded serviced residence Naylor Road",
    ],
  },
  {
    year: 2006,
    details: [
      "Launched 4.5 million sq. ft. of IT & IT-eS SEZ (Special Economic Zone) EON Free Zone Phase I in Kharadi",
    ],
  },
  {
    year: 2004,
    details: ["Received Foreign Direct Investment (FDI) from Merrill Lynch"],
  },
  {
    year: 2003,
    details: ["Commenced construction of Tech Park One office park in Yerwada"],
  },
  {
    year: 2002,
    details: [
      "Successfully delivered a built-to-suit office park for AXA Business Services in Bund Garden Road",
      "Launched ICC (International Convention Centre) in Senapati Bapat Road",
    ],
  },
];

const App = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const timelineRef = useRef(null);
  const yearRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (containerRef.current && sectionRefs.current[activeIndex]) {
      const container = containerRef.current;
      const targetSection = sectionRefs.current[activeIndex];
      container.scrollTo({
        left: targetSection.offsetLeft,
        behavior: "smooth",
      });
    }

    if (timelineRef.current && yearRefs.current[activeIndex]) {
      const timeline = timelineRef.current;
      const targetYear = yearRefs.current[activeIndex];
      timeline.scrollTo({
        left: targetYear.offsetLeft - 210,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const handleYearClick = (index) => {
    if (index >= data.length) {
      setActiveIndex(0);
    } else if (index < 0) {
      setActiveIndex(data.length - 1);
    } else {
      setActiveIndex(index);
    }
  };

  const handleDrag = (event) => {
    const timeline = timelineRef.current;
    if (timeline) {
      let isDown = false;
      let startX;
      let scrollLeft;

      timeline.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
      });

      timeline.addEventListener("mouseleave", () => {
        isDown = false;
      });

      timeline.addEventListener("mouseup", () => {
        isDown = false;
      });

      timeline.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed
        timeline.scrollLeft = scrollLeft - walk;
      });

      timeline.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
      });

      timeline.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2;
        timeline.scrollLeft = scrollLeft - walk;
      });
    }
  };

  useEffect(() => {
    handleDrag();
  }, []);

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col items-center p-10 md:pl-40">
      <div className="text-4xl md:text-6xl font-bold mt-10 w-full text-left tracking-wide">
        Growth Chronicles
      </div>

      <div ref={containerRef} className="w-full mt-8 overflow-hidden relative">
        <motion.div className="flex flex-nowrap transition-transform">
          {data.map((item, index) => (
            <motion.div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              onClick={() => handleYearClick(index % data.length)}
              className="w-[80vw] md:w-[40vw] py-15 mr-20 shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-[42px] font-bold text-[#FFA51B] mb-3 cursor-pointer">
                {item.year}
              </h2>
              <ul className="mt-4 space-y-2 md:space-y-3">
                {item.details.map((detail, i) => (
                  <li key={i} className="text-base md:text-lg text-white flex">
                    <span className="text-xl md:text-2xl mr-2 flex justify-center items-start">
                      •
                    </span>{" "}
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div
        ref={timelineRef}
        className="flex overflow-x-auto whitespace-nowrap w-full items-center cursor-pointer scrollbar-hide custom-scrollbar"
      >
        {[...data, ...data].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex items-center">
              <div
                className={`w-[50px] md:w-[70px] h-1 ${
                  activeIndex === index % data.length
                    ? "bg-[#FFA51B]"
                    : "bg-white"
                }`}
              ></div>
              <div
                ref={(el) => (yearRefs.current[index] = el)}
                onClick={() => handleYearClick(index % data.length)}
                className={`w-5 h-5 md:w-6 md:h-6 border-3 rounded-full cursor-pointer transition-transform ${
                  activeIndex === index % data.length
                    ? "scale-100 bg-[#FFA51B] border-[#FFA51B]"
                    : "bg-transparent border-white"
                }`}
              ></div>
              <div
                className={`w-[50px] md:w-[70px] h-1 ${
                  activeIndex === index % data.length
                    ? "bg-[#FFA51B]"
                    : "bg-white"
                }`}
              ></div>
            </div>
            <button
              onClick={() => handleYearClick(index % data.length)}
              className={`text-base md:text-xl mt-3 font-semibold transition mt-2 ${
                activeIndex === index % data.length
                  ? "text-[#FFA51B]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.year}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
