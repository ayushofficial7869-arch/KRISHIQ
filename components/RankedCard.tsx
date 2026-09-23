type Props={rank:number;name:string;price:number;distance:string;net:number;note:string};
export default function RankedCard(p:Props){return <div className="card p-4">
 <div className="flex items-start gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-krishiq-100 font-black text-krishiq-700">#{p.rank}</div>
 <div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h3 className="font-bold">{p.name}</h3><span className="font-black text-krishiq-700">₹{p.net.toLocaleString()}/q</span></div>
 <p className="mt-1 text-sm text-slate-500">{p.distance} • modal price ₹{p.price.toLocaleString()}</p><p className="mt-3 text-sm text-krishiq-700">{p.note}</p></div></div>
 </div>}
