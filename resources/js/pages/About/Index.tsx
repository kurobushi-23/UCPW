import { motion } from 'framer-motion';
import { PageLayout } from '../../components/page-layout';

export default function Index() {
    return (
        <PageLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8"
            >
                <h1 className="mb-6 text-4xl font-bold">Tentang Kami</h1>
                <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-gray-600">
                        Mengenal lebih dekat tentang siapa kami, budaya perusahaan, dan komitmen kami terhadap kualitas dan kepuasan klien.
                    </p>
                </div>
            </motion.div>
        </PageLayout>
    );
}
