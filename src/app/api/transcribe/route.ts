import { NextResponse } from "next/server";
import { SpeechClient } from "@google-cloud/speech";

// Initialize client (requires GOOGLE_APPLICATION_CREDENTIALS env var or default auth)
const client = new SpeechClient();

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const audioFile = formData.get("audio") as Blob;

        if (!audioFile) {
            return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
        }

        // Convert Blob to Buffer
        const buffer = Buffer.from(await audioFile.arrayBuffer());
        const audioBytes = buffer.toString("base64");

        // Configure request
        const request = {
            audio: {
                content: audioBytes,
            },
            config: {
                encoding: "WEBM_OPUS" as const,
                sampleRateHertz: 48000, // Standard for WebM
                languageCode: "en-US",
                // enableAutomaticPunctuation: true,
            },
        };

        // Detects speech in the audio file
        // Note: This expects credentials to be set up. 
        // If not, it will fail, but we'll handle the error gracefully.
        console.log("Sending request to Google Cloud Speech API...");
        const [response] = await client.recognize(request);
        console.log("Received response from Google Cloud Speech API");

        const transcription = response.results
            ?.map((result) => result.alternatives?.[0]?.transcript)
            .join("\n");

        console.log("Transcription result:", transcription);

        return NextResponse.json({ transcript: transcription || "" });
    } catch (error: unknown) {
        console.error("Transcription error details:", error);

        const errorMessage = error instanceof Error ? error.message : String(error);

        // Fallback for demo purposes if credentials are missing
        if (errorMessage.includes("Could not load the default credentials")) {
            return NextResponse.json({
                transcript: "[Mock] System audio detected... (Configure Google Cloud Credentials to see real transcription)",
                isMock: true
            });
        }

        return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 });
    }
}
