import type { LucideIcon } from 'lucide-react';
import { CalendarDays, CircleHelp, Clapperboard, Globe, HardDrive, Headset, Laptop, Mail, MessageCircle, Monitor, MonitorPlay, PanelsTopLeft, Smartphone, Star, Trophy, Tv, Users, Wrench, Zap } from 'lucide-react';

export const icons = { tv: Tv, smartTv: Tv, fireTv: MonitorPlay, phone: Smartphone, laptop: Laptop, mag: HardDrive, appleTv: Monitor, movies: Clapperboard, sports: Trophy, streaming: MonitorPlay, multiDevice: PanelsTopLeft, setup: Zap, support: Headset, global: Globe, duration: CalendarDays, connections: Users, recommended: Star, email: Mail, message: MessageCircle, help: CircleHelp, troubleshooting: Wrench } satisfies Record<string, LucideIcon>;
export type IconName = keyof typeof icons;
export function IconTile({name,size=28}:{name:IconName;size?:number}){const Glyph=icons[name];return <span className="icon-tile" aria-hidden="true"><Glyph size={size} strokeWidth={1.8}/></span>}
