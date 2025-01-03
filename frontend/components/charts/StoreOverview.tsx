import { FiUser } from "react-icons/fi";
import { GiWorld } from "react-icons/gi";
import { SiTemporal } from "react-icons/si";

export default function StoreOverview() {
  const sizeIcon = 30;
  const items = [
    {
      label: "Players",
      value: "159",
      className: "item-yellow",
      icon: <FiUser size={sizeIcon} />,
    },
    {
      label: "Worlds",
      value: "33",
      className: "item-red",
      icon: <GiWorld size={sizeIcon} />,
    },
    {
      label: "Items",
      value: "298",
      className: "item-green",
      icon: <SiTemporal size={sizeIcon} />,
    },
  ];

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h3 className="text-sm text-gray-600">Overview</h3>
      <ul className="space-y-2 mt-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border p-3 rounded-md"
          >
            <div className={`p-4 rounded-md ${item.className}`}>
              {item.icon}
            </div>
            <div className="text-2xl font-bold text-gray-700 flex flex-col text-right">
              <p>{item.value}</p>
              <p className="font-thin text-sm">{item.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
