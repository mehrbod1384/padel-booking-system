import PageHero from "@/components/layout/PageHero";
import LogOutButton from "@/features/auth/components/LogoutButton";

export default function HeroSection() {
  return (
    <PageHero
      image="/padel-racket.png"
      imageAlt="Padel court"
      eyebrow="PADEL COURTS"
      titleLead="Book your"
      titleAccent="court"
      description="Choose your court, select a time and book instantly"
      descriptionClassName="mt-4 max-w-xs w-50"
      actions={<LogOutButton />}
    />
  );
}
