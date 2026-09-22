import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { PAGE_META } from '../config/site';
import { organizationSchema, websiteSchema } from '../config/structuredData';
import { Hero, EditorialIntro, DestinationChapters, ExperienceScene, B2BTrust, JourneyRail, JournalFeature } from '../features/home';

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
                {/* <FinalCTA /> */}
            </main>
        </>
    );
}
