import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react";

// API Configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isError?: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your **AI Career Assistant** specializing in Business and Data Analyst positions. I can help you with:\n\n• Resume and LinkedIn optimization\n• Interview preparation strategies\n• Career transition guidance\n• Job search tactics\n• Industry insights\n\nWhat would you like to know about advancing your analyst career?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const generateSystemPrompt = (userMessage: string) => {
    return `You are an expert career consultant and AI assistant specializing in Business Analyst and Data Analyst career guidance. You work for a professional career consulting service that helps analysts advance their careers.

Your expertise includes:
- Business Analyst and Data Analyst career paths
- Resume optimization and LinkedIn profile enhancement
- Interview preparation for analyst roles
- Technical skills development
- Industry trends and insights
- Career transition strategies
- Salary negotiation
- Background check processes
- Professional networking

Guidelines for responses:
1. Keep responses helpful, professional, and encouraging
2. Focus specifically on Business Analyst and Data Analyst career advice
3. Provide actionable, specific guidance
4. Use ONLY **double asterisks** for bold text (like **this**), never single asterisks
5. Use • for bullet points, ## for section headings
6. Structure responses with clear sections and bullet points
7. Keep responses concise but comprehensive (aim for 2-4 paragraphs)
8. If asked about other topics, politely redirect to career-related discussions
9. Mention relevant tools, certifications, or skills when appropriate
10. Be supportive and motivating
11. IMPORTANT: Never mix single * and double ** asterisks - use **bold** consistently

User's question: ${userMessage}

Provide a helpful, specific response focused on their analyst career development. Use markdown formatting for better readability.`;
  };

  const sendToGemini = async (userMessage: string): Promise<string> => {
    if (!GEMINI_API_KEY) {
      return "I'm sorry, but the AI service isn't properly configured right now. However, I can still help you with general career advice! Please contact our team directly for personalized assistance. We're here to help with all your **Business and Data Analyst** career questions!";
    }

    try {
      const systemPrompt = generateSystemPrompt(userMessage);

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Gemini API Error:", errorData);

        if (response.status === 400) {
          return "I encountered a technical issue processing your request. Could you please rephrase your question? I'm here to help with your **analyst career goals**!";
        } else if (response.status === 403) {
          return "I'm having trouble accessing the AI service right now. Please try again in a moment, or contact our team directly for immediate career assistance.";
        } else {
          throw new Error(`API Error: ${response.status}`);
        }
      }

      const data = await response.json();

      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts[0]
      ) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      return "I'm experiencing a temporary connection issue. While I get back online, feel free to contact our career consultants directly for immediate assistance with your **Business or Data Analyst** career questions. We're always here to help!";
    }
  };

  const simulateTyping = async (text: string): Promise<void> => {
    return new Promise((resolve) => {
      const typingDuration = Math.min(text.length * 20, 2000); // Max 2 seconds
      setTimeout(resolve, typingDuration);
    });
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const botResponse = await sendToGemini(trimmedInput);

      // Simulate typing delay for better UX
      await simulateTyping(botResponse);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or contact our team directly for personalized career guidance. We're committed to helping you succeed in your **analyst career**!",
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Chat cleared! I'm still here to help with your **Business and Data Analyst** career questions. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  // Enhanced formatting function that handles markdown-style formatting
  const formatMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIndex) => {
      // Handle headings (## text)
      if (line.startsWith("## ")) {
        return (
          <div
            key={lineIndex}
            className="font-bold text-base mb-2 mt-3 first:mt-0"
          >
            {formatInlineElements(line.replace("## ", ""))}
          </div>
        );
      }

      // Handle bullet points (• text or - text)
      if (line.match(/^[•\-]\s/)) {
        return (
          <div key={lineIndex} className="flex items-start mb-1">
            <span className="text-[#2ECC71] font-bold mr-2 mt-0.5 flex-shrink-0">
              •
            </span>
            <span>{formatInlineElements(line.replace(/^[•\-]\s/, ""))}</span>
          </div>
        );
      }

      // Handle numbered lists (1. text)
      if (line.match(/^\d+\.\s/)) {
        const number = line.match(/^(\d+)\./)?.[1] || "1";
        return (
          <div key={lineIndex} className="flex items-start mb-1">
            <span className="text-[#2ECC71] font-semibold mr-2 mt-0.5 flex-shrink-0 min-w-[1rem]">
              {number}.
            </span>
            <span>{formatInlineElements(line.replace(/^\d+\.\s/, ""))}</span>
          </div>
        );
      }

      // Handle regular lines
      if (line.trim() === "") {
        return <div key={lineIndex} className="h-3"></div>; // Empty line spacing
      }

      return (
        <div key={lineIndex} className="mb-1">
          {formatInlineElements(line)}
        </div>
      );
    });
  };

  // Function to handle inline formatting like **bold** and *italic*
  const formatInlineElements = (text: string) => {
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;

    // Regex to match **bold**, *italic*, `code`, and other patterns
    const formatRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|~~[^~]+~~)/g;
    let match;

    while ((match = formatRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push(text.slice(currentIndex, match.index));
      }

      const matchedText = match[0];
      const innerText = matchedText.slice(2, -2); // Remove formatting characters

      // Apply formatting based on the pattern
      if (matchedText.startsWith("**")) {
        parts.push(
          <strong key={match.index} className="font-semibold text-gray-900">
            {innerText}
          </strong>
        );
      } else if (matchedText.startsWith("*")) {
        parts.push(
          <em key={match.index} className="italic">
            {matchedText.slice(1, -1)}
          </em>
        );
      } else if (matchedText.startsWith("`")) {
        parts.push(
          <code
            key={match.index}
            className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800"
          >
            {matchedText.slice(1, -1)}
          </code>
        );
      } else if (matchedText.startsWith("~~")) {
        parts.push(<del key={match.index}>{innerText}</del>);
      }

      currentIndex = match.index + matchedText.length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
          aria-label="Open career chat assistant"
        >
          <MessageCircle
            size={20}
            className="group-hover:scale-110 transition-transform sm:w-6 sm:h-6"
          />
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] sm:w-96 sm:h-[600px] max-w-md flex flex-col border border-gray-200 overflow-hidden fixed bottom-4 right-4 sm:relative sm:bottom-auto sm:right-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2ECC71] to-[#008080] text-white p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot size={20} className="sm:w-6 sm:h-6" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg">
                  AI Career Assistant
                </h3>
                <p className="text-xs text-green-100 hidden sm:block">
                  {isTyping
                    ? "Typing..."
                    : "Online • Business & Data Analyst Expert"}
                </p>
                <p className="text-xs text-green-100 sm:hidden">
                  {isTyping ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClearChat}
                className="hover:bg-white/10 rounded-full p-1 transition-colors text-xs px-2 py-1 hidden sm:block"
                title="Clear chat"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 sm:space-x-3 ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#008080] to-[#006666]"
                      : message.isError
                      ? "bg-red-500"
                      : "bg-gradient-to-r from-[#2ECC71] to-[#27AE60]"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User size={14} className="sm:w-4 sm:h-4" />
                  ) : message.isError ? (
                    <AlertCircle size={14} className="sm:w-4 sm:h-4" />
                  ) : (
                    <Bot size={14} className="sm:w-4 sm:h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] sm:max-w-[85%] ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-[#008080] to-[#006666] text-white rounded-tr-md"
                        : message.isError
                        ? "bg-red-50 text-red-800 border border-red-200 rounded-tl-md"
                        : "bg-white text-gray-800 border border-gray-200 rounded-tl-md shadow-sm"
                    }`}
                  >
                    <div className="space-y-1">
                      {message.sender === "user" ? (
                        <div className="whitespace-pre-wrap">
                          {message.text}
                        </div>
                      ) : (
                        formatMessageText(message.text)
                      )}
                    </div>
                  </div>
                  <div
                    className={`text-xs mt-1 px-1 hidden sm:block ${
                      message.sender === "user"
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white">
                  <Bot size={14} className="sm:w-4 sm:h-4" />
                </div>
                <div className="bg-white text-gray-800 rounded-2xl rounded-tl-md border border-gray-200 p-2 sm:p-3 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Loader2
                      size={14}
                      className="animate-spin text-[#2ECC71] sm:w-4 sm:h-4"
                    />
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end space-x-2">
              <div className="flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your career..."
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent resize-none transition-all"
                  disabled={isLoading}
                  maxLength={500}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-lg p-2 sm:p-3 transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-none"
                aria-label="Send message"
              >
                <Send size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Footer Text */}
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span className="hidden sm:inline">
                💡 Get instant career guidance
              </span>
              <span className="sm:hidden">💡 Career help</span>
              <span>{inputText.length}/500</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
