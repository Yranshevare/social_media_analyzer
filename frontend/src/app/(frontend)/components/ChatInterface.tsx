"use client";

import React, {
  useEffect,
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  graphData?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  comparisonData?: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    websocket.current = new WebSocket("ws://localhost:8000/ws/chat");
    // websocket.current = new WebSocket("wss://laknjw764k3jrvggk5746sfy2e.srv.us/ws/chat");  
    // websocket.current = new WebSocket("ws://localhost:8000/ws/chat");

    websocket.current.onopen = () => {
      console.log('WebSocket connection established');
    };
   

    websocket.current.onmessage = (event: MessageEvent) => {
      const response = JSON.parse(event.data);
      console.log("Received Response:", response);

      const botMessage =
        response.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
        "No response received.";

      if (botMessage && typeof botMessage === "string") {
        const metrics = extractMetrics(botMessage);
        const comparison = extractComparison(botMessage);

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            role: "bot",
            content: botMessage,
            graphData: metrics || undefined,
            comparisonData: comparison || undefined,
          },
        ]);
      }
    };

    

    return () => {
      websocket.current?.close();
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && websocket.current) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, role: "user", content: input },
      ]);
      websocket.current.send(input);
      setInput("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const extractMetrics = (text: string) => {
    const rows = text.match(
      /(Carousel|Reel|Static Image|Ad).*?\|.*?\|.*?\|.*?\|.*?/g
    );
    if (rows) {
      const labels = ["Carousel", "Reel", "Static Image", "Ad"];
      const likes: number[] = [];
      const shares: number[] = [];
      const comments: number[] = [];

      rows.forEach((row) => {
        const splitRow = row.split("|").map((item) => item.trim());
        if (splitRow.length >= 5) {
          likes.push(parseFloat(splitRow[2]) || 0);
          shares.push(parseFloat(splitRow[3]) || 0);
          comments.push(parseFloat(splitRow[4]) || 0);
        }
      });

      return {
        labels,
        datasets: [
          {
            label: "Avg Likes",
            data: likes,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Avg Shares",
            data: shares,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "Avg Comments",
            data: comments,
            backgroundColor: "rgba(255, 99, 132, 0.6)", // Ensure a distinct color for comments
          },
        ],
      };
    }
    return null;
  };

  const extractComparison = (text: string) => {
    const comparisonRegex = /comparison data:([\s\S]*?)recommendations:/i;
    const match = text.match(comparisonRegex);
    return match ? match[1].trim() : null;
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-white shadow-inner overflow-hidden">
      <ScrollArea className="flex-grow p-4">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start mb-4 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-2 ${
                m.role === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  m.role === "user" ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {m.role === "user" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div
                className={`max-w-[70%] px-3 py-2 mt-2 ${
                  m.role === "user"
                    ? "bg-blue-500 text-white  rounded-l-lg rounded-b-lg"
                    : "bg-gray-200 text-black  rounded-r-lg rounded-b-lg"
                } shadow-md`}
              >
                {m.role === "bot" ? (
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                ) : (
                  m.content
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Render graphs for all bot messages */}
        {messages
          .filter((m) => m.role === "bot" && m.graphData)
          .map((m) => (
            <div key={m.id} className="p-4">
              <Bar
                data={
                  m.graphData || {
                    labels: [],
                    datasets: [
                      {
                        label: "",
                        data: [],
                        backgroundColor: "",
                      },
                    ],
                  }
                }
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />
            </div>
          ))}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about social media strategies..."
            className="flex-grow shadow-sm"
          />
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
