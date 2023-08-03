"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Jevon",
    avatar: "J",
    title: "Software Engineer",
    description: "This is the best and fastest AI tool I have ever used!",
  },
  {
    name: "Antonio",
    avatar: "A",
    title: "Backend Developer",
    description: "This app makes my job so much easier!",
  },
  {
    name: "Jair",
    avatar: "J",
    title: "Video Editor",
    description: "I love using this software!",
  },
  {
    name: "Jane",
    avatar: "J",
    title: "Artist",
    description: "10/10, highly recommend!",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item, index) => (
          <Card key={index} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
