import { MapPin, Mail, Phone } from "lucide-react";

const StoreInfo = ({ store }) => {
  return (
    <div className="flex-1 space-y-3 text-sm text-slate-600">
      
      {/* Store Logo */}
      <img
        src={store.logo}
        alt={store.name}
        className="w-20 h-20 object-contain rounded-full shadow mx-auto sm:mx-0"
      />

      {/* Store Name & Status */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <h3 className="text-xl font-semibold text-slate-800">
          {store.name}
        </h3>

        <span className="text-sm text-slate-500">
          @{store.username}
        </span>

        {/* Status Badge */}
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full
            ${
              store.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : store.status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
        >
          {store.status}
        </span>
      </div>

      {/* Description */}
      <p className="max-w-2xl text-slate-600">
        {store.description}
      </p>

      {/* Contact Info */}
      <div className="space-y-1">
        <p className="flex items-center gap-2">
          <MapPin size={16} /> {store.address}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} /> {store.contact}
        </p>
        <p className="flex items-center gap-2">
          <Mail size={16} /> {store.email}
        </p>
      </div>

      {/* Owner Info */}
      <p className="text-slate-700 mt-4">
        Applied on{" "}
        <span className="text-xs text-slate-500">
          {new Date(store.createdAt).toLocaleDateString()}
        </span>
      </p>

      <div className="flex items-center gap-3">
        <img
          src={store.user.image}
          alt={store.user.name}
          className="w-9 h-9 rounded-full"
        />
        <div>
          <p className="font-medium text-slate-700">
            {store.user.name}
          </p>
          <p className="text-xs text-slate-400">
            {store.user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
