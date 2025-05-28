import { Card } from "@/components/ui/card";

interface TeamMember {
  name: string;
  role: string;
  position: string;
}

interface TeamCardsProps {
  title: string;
  members: TeamMember[];
  isStudent?: boolean;
}

export function TeamCards({
  title,
  members,
  isStudent = false,
}: TeamCardsProps) {
  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {members.map((member, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-600 mb-1">{member.role}</p>
            {!isStudent && <p className="text-gray-500">{member.position}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}
