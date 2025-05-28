import { TeamCards } from "./TeamCards";

export default function Footer() {
  const facultyCoordinators = [
    {
      name: "Dr. Sanyog Rawat",
      role: "Faculty Coordinator",
      position: "Head, Department of ECE",
    },
    {
      name: "Dr. Milan Sasmal",
      role: "Faculty Coordinator",
      position: "Prof, Department of ECE",
    },
    {
      name: "Dr. Rajan Singh",
      role: "Faculty Coordinator",
      position: "Prof, Department of ECE",
    },
    {
      name: "Dr. Kapil Saraswat",
      role: "Faculty Coordinator",
      position: "Prof, Department of ECE",
    },
    {
      name: "Dr. Sudhir Bhaskar",
      role: "Faculty Coordinator",
      position: "Prof, Department of ECE",
    },
  ];

  const studentLeads = [
    {
      name: "Arijit Lodhi",
      role: "Student Co-lead",
      position: "",
    },
    {
      name: "Hitesh Mali",
      role: "Student Co-lead",
      position: "",
    },
  ];

  return (
    <footer className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Department of Electronics and Technology
          </h2>
          <p className="text-gray-600">School of Engineering and Technology</p>
        </div>

        <TeamCards title="Faculty Coordinators" members={facultyCoordinators} />
        <TeamCards
          title="Student Co-leads"
          members={studentLeads}
          isStudent={true}
        />
      </div>
    </footer>
  );
}
