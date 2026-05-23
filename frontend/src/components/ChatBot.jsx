import {
  useState,
  useRef,
  useEffect,
} from "react";

import axios from "axios";

const ChatBot = () => {

  const [open,
    setOpen] =
    useState(false);

  const [message,
    setMessage] =
    useState("");

  const [messages,
    setMessages] =
    useState([
      {
        sender: "bot",
        text:
          "Hello 👋 How can I help you today?",
      },
    ]);

  const [loading,
    setLoading] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  // AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior:
          "smooth",
      });

  }, [messages]);

  // SEND MESSAGE
  const sendMessage =
    async (
      customMessage
    ) => {

      const finalMessage =
        customMessage ||
        message;

      if (!finalMessage.trim())
        return;

      const userMessage = {

        sender: "user",

        text: finalMessage,
      };

      setMessages(
        (prev) => [
          ...prev,
          userMessage,
        ]
      );

      setMessage("");

      try {

        setLoading(true);

        const { data } =
          await axios.post(
            "http://localhost:5000/api/chat",
            {
              message:
                finalMessage,
            }
          );

        const botMessage = {

          sender: "bot",

          text:
            data.reply,
        };

        setMessages(
          (prev) => [
            ...prev,
            botMessage,
          ]
        );

      } catch (error) {

        console.log(error);

        setMessages(
          (prev) => [
            ...prev,
            {
              sender: "bot",

              text:
                "AI quota exceeded. Please try again later.",
            },
          ]
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <>
      {/* CHAT BUTTON */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-5 right-5 z-50 group"
      >

        <div className="relative overflow-hidden rounded-full bg-[#050816] px-4 py-2 flex items-center gap-3 shadow-[0_10px_35px_rgba(0,0,0,0.45)] border border-slate-800 hover:scale-105 transition duration-300">

          {/* GLOW */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 blur-2xl"></div>

          {/* ICON */}
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">

            <span className="text-white text-lg">

              ✦

            </span>

          </div>

          {/* TEXT */}
          <div className="relative flex items-center gap-2">

            <span className="text-white font-semibold text-lg">

              AI Assistant

            </span>

            <span className="text-white text-2xl group-hover:translate-x-1 transition duration-300">

              ›

            </span>

          </div>

        </div>

      </button>

      {/* CHAT WINDOW */}
      <div
        className={`fixed bottom-24 right-5 transition-all duration-500 z-50 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >

        <div className="w-[360px] h-[580px] bg-white rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.30)] border border-slate-200 flex flex-col">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-3 flex items-center justify-between">

            <div>

              <h2 className="text-white text-lg font-bold leading-none">

                AI Assistant

              </h2>

              <p className="text-white/80 text-[11px] mt-1">

                Smart ecommerce helper

              </p>

            </div>

            {/* CLOSE */}
            <button
              onClick={() =>
                setOpen(false)
              }
              className="w-8 h-8 rounded-full bg-white text-slate-900 hover:bg-slate-200 font-bold text-xs transition duration-300 flex items-center justify-center"
            >

              ✕

            </button>

          </div>

          {/* QUICK SUGGESTIONS */}
          <div className="px-3 pt-3 flex flex-wrap gap-2 bg-[#eef2f7]">

            {[
              "Best products",
              "Track my order",
              "Latest deals",
              "Help me shop",
            ].map((item) => (

              <button
                key={item}
                onClick={() =>
                  sendMessage(item)
                }
                className="px-3 py-2 rounded-full bg-white text-slate-700 text-xs shadow hover:bg-blue-600 hover:text-white transition duration-300"
              >

                {item}

              </button>
            ))}

          </div>

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto px-3 py-4 bg-[#eef2f7] space-y-3">

            {messages.map(
              (
                msg,
                index
              ) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.sender ===
                    "user"

                      ? "justify-end"

                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-2xl text-[13px] leading-6 shadow-sm ${
                      msg.sender ===
                      "user"

                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"

                        : "bg-white text-slate-800"
                    }`}
                  >

                    {
                      msg.text.length > 120

                        ? msg.text.slice(
                            0,
                            120
                          ) + "..."

                        : msg.text
                    }

                  </div>

                </div>
              )
            )}

            {/* LOADING */}
            {loading && (

              <div className="flex justify-start">

                <div className="bg-white text-slate-800 px-4 py-3 rounded-2xl shadow-sm">

                  <div className="flex items-center gap-2">

                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>

                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></span>

                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200"></span>

                  </div>

                </div>

              </div>
            )}

            <div ref={messagesEndRef}></div>

          </div>

          {/* INPUT AREA */}
          <div className="p-3 bg-white border-t border-slate-200">

            <div className="flex items-center gap-3">

              <input
                type="text"
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                placeholder="Ask AI anything..."
                className="flex-1 h-12 px-4 rounded-2xl border border-slate-300 outline-none text-sm"
                onKeyDown={(e) => {

                  if (
                    e.key ===
                    "Enter"
                  ) {

                    sendMessage();
                  }
                }}
              />

              <button
                onClick={
                  sendMessage
                }
                className="h-12 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-semibold text-sm transition duration-300 shadow-md"
              >

                Send

              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default ChatBot;