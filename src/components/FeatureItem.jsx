export default function FeatureItem({ icon: Icon, title, description }) {
  return (
    <div className="reveal">
      <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center text-white mb-5 shadow-btn">
        <Icon size={20} strokeWidth={2} />
      </div>
      <h4 className="text-lg font-bold text-ink mb-2">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
