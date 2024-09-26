import QuestionDialog from "@/components/custom/Question/QuestionDialog";
import { Difficulty, Question, Topic } from "@/models/Question";
import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const customQuestion: Question = {
	id: "q123",
	title: "Find the Longest Palindromic Substring",
	description:
		"Given a string `s`, return the longest palindromic substring in `s`. A palindromic substring is a substring that reads the same backward as forward.",
	topics: [
		Topic.Strings,
		Topic.DynamicProgramming,
		Topic.Algorithms,
		Topic.Strings,
		Topic.DynamicProgramming,
		Topic.Algorithms,
		Topic.Strings,
		Topic.DynamicProgramming,
		Topic.Algorithms,
	],
	difficulty: Difficulty.Medium,
	dateCreated: "2024-09-16T08:00:00Z",
	examples: [
		{
			input: "babad",
			output: "bab", // "aba" is also a valid answer
		},
		{
			input: "cbbd",
			output: "bb",
		},
	],
	constraints: [
		"1 <= s.length <= 1000",
		"s consist of only digits and English letters.",
	],
};

function CollabPageView() {
	const [code, setCode] = useState("");
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		// Initialize the WebSocket connection when the component mounts
		const newSocket = io("http://localhost:5004"); // Backend WebSocket server URL
		setSocket(newSocket);

		newSocket.on("connect", () => {
			console.log("WebSocket connected");
			newSocket.emit("joinSession", "session123");
		});

		// Listen for code updates from the server
		newSocket.on("codeUpdated", (data) => {
			console.log("Code update received from server:", data);
			setCode(data.code);
		});

		return () => {
			newSocket.disconnect(); // Cleanup WebSocket connection on component unmount
		};
	}, []);

	const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newCode = e.target.value;
		setCode(newCode); // Update the local state

		// Emit the code update to the WebSocket server
		if (socket) {
			console.log("Emitting code update:", newCode);
			socket.emit("codeUpdate", {
				sessionId: "session123", // Example session ID
				code: newCode,
			});
		}
	};

	return (
		<main
			style={{
				display: "flex",
				width: "100vw", // Full viewport width
				height: "100vh", // Full viewport height
			}}
		>
			{/* <textarea
				value={code}
				onChange={handleCodeChange}
				className="fixed bottom-4 right-4 w-64 h-32 p-2 border rounded-md bg-white text-black"
				placeholder="Type code here..."
			/> */}
			<div
				style={{
					flex: 1, // Takes up equal space as the textarea
					display: "flex",
					alignItems: "center", // Centers the title vertically
					justifyContent: "center", // Centers the title horizontally
					border: "5px solid black", // Adds a border
				}}
			>
				<QuestionDialog question={customQuestion} />
			</div>
			<div
				style={{
					flex: 1, // Takes up equal space as the title section
					display: "flex",
					flexDirection: "column", // Stacks the label and textarea vertically
					justifyContent: "center", // Centers the textarea horizontally within its section
					alignItems: "center", // Centers the textarea vertically within its section
					border: "5px solid pink", // Adds a border
					padding: "20px",
				}}
			>
				<Label
					htmlFor="message"
					style={{ alignSelf: "flex-start", marginBottom: "10px" }}
				>
					Code
				</Label>
				<Textarea
					style={{ height: "100%" }}
					placeholder="class Solution {
    public int[] main(int param1, int param2) {
        
    }
}"
					id="message"
				/>
			</div>
		</main>
	);
}

export default CollabPageView;
