import axios from "axios";

// Replace this with your Google Apps Script Web App URL
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzidQLzJ4BEvmS5s7qX5yAj0h_IUEyLvjXySs9U_o0Zn76iA09Vno8uDYxqpqxoA3O_lQ/exec";

// Define the type for form data
type FormData = {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  year: string;
  track: string;
  teamName: string;
  teamSize: string;
  projectIdea: string;
  projectLink: string;
  [key: string]: string;
};

export async function POST(request: Request) {
  try {
    const formData = (await request.json()) as FormData;
    // Debug log
    console.log("Received form data:", formData);

    // Convert form data to URLSearchParams (form-urlencoded)
    const formPayload = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      formPayload.append(key, value);
    }
    console.log("Form payload:", formPayload.toString());
    // Submit to Google Apps Script
    const response = await axios.post(APPS_SCRIPT_URL, formPayload.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      validateStatus: () => true,
    });

    // Debug log
    console.log("Apps Script response status:", response.status);
    console.log("Apps Script response data:", response.data);

    if (response.status === 200 || response.status === 0) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({
          error: `Apps Script returned status ${response.status}`,
          details: response.data,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error: unknown) {
    console.error("Error submitting data:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(
      JSON.stringify({
        error: "Failed to submit data",
        details: errorMessage,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
