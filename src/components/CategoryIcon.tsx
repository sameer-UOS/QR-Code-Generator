import React from 'react';
import {
  Globe,
  AlignLeft,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  UserCheck,
  Wifi,
  Share2,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Facebook,
  Briefcase,
  MapPin,
  Calendar,
  CreditCard,
  Smartphone,
} from 'lucide-react';
import { QRCategory } from '../types/qr';

interface CategoryIconProps {
  category: QRCategory;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = 'w-4 h-4' }) => {
  switch (category) {
    case 'url':
      return <Globe className={className} />;
    case 'text':
      return <AlignLeft className={className} />;
    case 'email':
      return <Mail className={className} />;
    case 'phone':
      return <Phone className={className} />;
    case 'sms':
      return <MessageSquare className={className} />;
    case 'whatsapp':
      return <MessageCircle className={className} />;
    case 'vcard':
      return <UserCheck className={className} />;
    case 'wifi':
      return <Wifi className={className} />;
    case 'social':
      return <Share2 className={className} />;
    case 'instagram':
      return <Instagram className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'twitter':
      return <Twitter className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'facebook':
      return <Facebook className={className} />;
    case 'business':
      return <Briefcase className={className} />;
    case 'location':
      return <MapPin className={className} />;
    case 'event':
      return <Calendar className={className} />;
    case 'payment':
      return <CreditCard className={className} />;
    case 'app':
      return <Smartphone className={className} />;
    default:
      return <Globe className={className} />;
  }
};
