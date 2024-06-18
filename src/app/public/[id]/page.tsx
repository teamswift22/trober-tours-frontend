import {
  Bus,
  CalendarCheck,
  LoaderCircle,
  MapPin,
  Share2,
  User,
} from "lucide-react";
import React from "react";

const Details = ({ icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-x-2 ">
    <div className="bg-secondary rounded-full p-2 text-white">{icon}</div>
    <p className="font-sora font-bold text-2xl text-[#00618F]">{text}</p>
  </div>
);

const arrayOfIncludes = ["Tranport", "Accomodation", "Food"];
const Page = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 py-5">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <h4 className="font-bold font-sora text-xl md:text-3xl text-[#1D1D1D]">
            Akosombo Safari and Boat Cruise Private Tour
          </h4>
          <p className="text-sm text-[#112211]">By Mainstream Tours</p>
        </div>
        <button className="bg-secondary text-white p-3 rounded-md ">
          <Share2 />
        </button>
      </div>
      <div className="h-128 w-full bg-red-500"></div>
      <div className="grid grid-cols-2 md:flex items-center flex-wrap justify-between gap-y-4 pt-6 pb-11 border-b-[2px]">
        <Details icon={<MapPin />} text="Akosombo" />
        <Details icon={<CalendarCheck />} text="20th April, 2024" />
        <Details icon={<LoaderCircle />} text="2 Days" />
        <Details icon={<Bus />} text="Accra Mall" />
        <Details icon={<User />} text="10/20" />
        <Details icon={<User />} text="Adventure" />
      </div>
      <div className="pt-10 pb-3 border-b-[2px] ">
        <div className="px-5">
          <h4 className="font-sora font-bold text-[#333333] text-2xl mb-2">
            Overview
          </h4>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas iusto
            vitae, reiciendis recusandae qui eius temporibus eos minima
            corrupti, illum, perspiciatis suscipit rem nulla. Non dignissimos
            illum ratione voluptatum explicabo! Id ex consequuntur accusamus
            fugit recusandae, sapiente accusantium eligendi voluptates quasi
            omnis iusto autem commodi vel temporibus in eveniet dicta laboriosam
            sequi necessitatibus? Ut tenetur a, repellendus earum numquam
            debitis eligendi voluptatibus itaque voluptatem hic deleniti aliquam
            nemo cumque dolorem ad mollitia similique, sint ea tempora
            consectetur vitae, corrupti reiciendis. Voluptatum, odit totam?
            Accusantium, soluta incidunt nemo assumenda numquam praesentium
            quae! Modi, possimus! Omnis assumenda adipisci voluptates excepturi
            amet perspiciatis eveniet reprehenderit fuga ratione dolore optio
            architecto placeat repellendus error nesciunt officiis voluptate
            labore fugit atque, aperiam magnam quas eligendi temporibus
            similique? Neque mollitia illo atque pariatur. Eum non cumque qui
            consequatur. Alias iure ex, rem recusandae natus exercitationem sit
            quidem voluptatum, magnam, iusto eum possimus. Vitae similique
            voluptatibus dolorem laboriosam accusamus, deserunt corporis
            eligendi. Labore aperiam obcaecati, necessitatibus, nemo unde
            doloribus reiciendis tenetur laborum doloremque enim quaerat rem
            perspiciatis praesentium vitae autem quam dolores aspernatur
            accusantium facilis repellendus in reprehenderit quos. Reprehenderit
            doloribus non, harum unde officia, suscipit porro possimus
            reiciendis quisquam labore expedita numquam? Corrupti at, illum
            architecto officiis quos dicta ex nisi commodi molestias
            perspiciatis fuga assumenda, reiciendis corporis voluptate?
            Voluptatem quis, numquam sunt molestiae incidunt iure molestias,
            repellat illo ea nulla, deleniti inventore. Pariatur in, voluptatum
            beatae officiis veniam tempore reprehenderit provident. Temporibus
            dolores officiis itaque! Tenetur consectetur dicta consequatur in
            nesciunt, dolorum aliquid. Corrupti earum delectus, labore deserunt
            reprehenderit saepe fuga error hic veniam unde minima voluptatibus
            rerum molestias in? Sed neque est aperiam ratione nobis fugiat nulla
            ipsum consequatur. Tempore veritatis aliquam reprehenderit. Expedita
            distinctio corporis saepe ab. Aliquam ipsa vero facilis
            exercitationem voluptatum placeat, at optio illo similique eum,
            voluptatem veniam amet explicabo!
          </p>
        </div>
      </div>
      <div className="py-12 px-5 border-b-2">
        <h4 className="font-sora font-bold text-[#333333] text-2xl mb-2">
          Price Includes:
        </h4>
        <div className="flex items-center flex-wrap gap-2">
          {arrayOfIncludes?.map((item) => (
            <p
              key={item}
              className="font-sora text-sm border-secondary border-[1px] w-fit px-3 py-1 rounded text-[#4F4F4F]"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div>
        <div
          style={{
            background: "linear-gradient(268deg, #32b3ec 0%, #076087 100%)",
          }}
          className="max-w-[526px]"
        >
          <h4>Join Tour</h4>
          <p>Select total number of travelers</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
