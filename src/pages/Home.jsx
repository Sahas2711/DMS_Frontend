import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { PAGE_META } from '../config/site';
import { organizationSchema, websiteSchema } from '../config/structuredData';
import Hero from './Home/Hero';
import EditorialIntro from './Home/EditorialIntro';
import DestinationChapters from './Home/DestinationChapters';
import ExperienceScene from './Home/ExperienceScene';
import B2BTrust from './Home/B2BTrust';
import JourneyRail from './Home/JourneyRail';
import JournalFeature from './Home/JournalFeature';
import FinalCTA from './Home/FinalCTA';

export default function Home() {
    return (
        <>
            <Seo {...PAGE_META['/']} path="/" />
            <JsonLd data={[organizationSchema(), websiteSchema()]} />
            <main>
                <Hero />
                <EditorialIntro />
                <DestinationChapters />
                <ExperienceScene />
                <B2BTrust />
                <JourneyRail />
                <JournalFeature />
                <FinalCTA />
            </main>
        </>
    );
}
