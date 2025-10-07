// Team data for CodeUtsava 9.0 - organized by hierarchy
import dummyImage from "../images/dummys.jpeg";

// Overall Coordinators - Top level leadership
export const overallCoordinators = [
  {
    id: 1,
    name: "John Doe",
    role: "Overall Coordinator",
    image: dummyImage,
    bio: "Leading the entire CodeUtsava 9.0 carnival with passion and innovation.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Overall Coordinator", 
    image: dummyImage,
    bio: "Ensuring seamless coordination across all carnival events and activities.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  }
];

// Head Coordinators - Department heads
export const headCoordinators = [
  {
    id: 3,
    name: "Alice Johnson",
    role: "Head of Technology",
    department: "Tech",
    image: dummyImage,
    bio: "Overseeing all technical aspects of the carnival infrastructure.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 4,
    name: "Bob Wilson",
    role: "Head of Operations",
    department: "Operations",
    image: dummyImage,
    bio: "Managing logistics and ensuring smooth carnival operations.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 5,
    name: "Carol Davis",
    role: "Head of Marketing",
    department: "Marketing",
    image: dummyImage,
    bio: "Spreading the carnival magic across all digital platforms.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 6,
    name: "David Brown",
    role: "Head of Sponsorship",
    department: "Sponsorship",
    image: dummyImage,
    bio: "Building partnerships to make the carnival possible.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  }
];

// Managers - Middle management
export const managers = [
  {
    id: 7,
    name: "Eva Martinez",
    role: "Tech Manager",
    department: "Tech",
    image: dummyImage,
    bio: "Developing and maintaining carnival platform features.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 8,
    name: "Frank Miller",
    role: "Event Manager",
    department: "Operations",
    image: dummyImage,
    bio: "Coordinating hackathon and workshop logistics.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 9,
    name: "Grace Lee",
    role: "Social Media Manager",
    department: "Marketing",
    image: dummyImage,
    bio: "Creating engaging content for the carnival community.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 10,
    name: "Henry Taylor",
    role: "Partnership Manager",
    department: "Sponsorship",
    image: dummyImage,
    bio: "Nurturing relationships with industry partners.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 11,
    name: "Ivy Chen",
    role: "Design Manager",
    department: "Creative",
    image: dummyImage,
    bio: "Crafting the visual identity of the carnival experience.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 12,
    name: "Jack Anderson",
    role: "Community Manager",
    department: "Community",
    image: dummyImage,
    bio: "Building and engaging our vibrant carnival community.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  }
];

// Executives - Ground level team members
export const executives = [
  {
    id: 13,
    name: "Kelly White",
    role: "Frontend Executive",
    department: "Tech",
    image: dummyImage,
    bio: "Building beautiful user interfaces for carnival participants.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 14,
    name: "Leo Garcia",
    role: "Backend Executive",
    department: "Tech", 
    image: dummyImage,
    bio: "Ensuring robust backend systems for seamless carnival experience.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 15,
    name: "Maya Patel",
    role: "Event Executive",
    department: "Operations",
    image: dummyImage,
    bio: "Supporting event coordination and participant assistance.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 16,
    name: "Noah Kim",
    role: "Logistics Executive",
    department: "Operations",
    image: dummyImage,
    bio: "Managing venue setup and carnival infrastructure.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 17,
    name: "Olivia Ross",
    role: "Content Executive",
    department: "Marketing",
    image: dummyImage,
    bio: "Creating compelling content to showcase carnival highlights.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 18,
    name: "Paul Singh",
    role: "Graphics Executive",
    department: "Creative",
    image: dummyImage,
    bio: "Designing eye-catching visuals for carnival promotions.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 19,
    name: "Quinn Torres",
    role: "Video Executive",
    department: "Creative",
    image: dummyImage,
    bio: "Producing dynamic video content for carnival events.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 20,
    name: "Ruby Clark",
    role: "Outreach Executive",
    department: "Sponsorship",
    image: dummyImage,
    bio: "Connecting with potential sponsors and partners.",
    social: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  }
];

// Department color mapping for visual organization
export const departmentColors = {
  Tech: "#802b1d", // Primary red
  Operations: "#2c2b4c", // Purple
  Marketing: "#f3a83a", // Gold/Orange
  Sponsorship: "#E4D0B6", // Cream
  Creative: "#FF6B6B", // Coral
  Community: "#4ECDC4" // Teal
};

// Hierarchy levels for styling
export const hierarchyLevels = {
  "Overall Coordinator": 1,
  "Head of Technology": 2,
  "Head of Operations": 2, 
  "Head of Marketing": 2,
  "Head of Sponsorship": 2,
  "Tech Manager": 3,
  "Event Manager": 3,
  "Social Media Manager": 3,
  "Partnership Manager": 3,
  "Design Manager": 3,
  "Community Manager": 3,
  "Frontend Executive": 4,
  "Backend Executive": 4,
  "Event Executive": 4,
  "Logistics Executive": 4,
  "Content Executive": 4,
  "Graphics Executive": 4,
  "Video Executive": 4,
  "Outreach Executive": 4
};