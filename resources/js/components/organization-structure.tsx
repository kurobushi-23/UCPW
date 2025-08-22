import { motion } from 'framer-motion';

const orgData = {
    komisaris: 'Luqman Hakim',
    direktur: 'Holilulloh',
    hrd: 'Maeladin',
    safety: 'Miftahan',
    coordinator: 'Ari Imron',
    purchasing: 'Didi Suhardi',
    finance: 'Yuyunati',
    projects: [
        { manager: 'Project Manager 1', spv: ['SPV 1', 'SPV 2'] },
        { manager: 'Project Manager 2', spv: ['SPV 1', 'SPV 2'] },
        { manager: 'Project Manager 3', spv: ['SPV 1', 'SPV 2'] },
    ],
};

const Card = ({ title, name }: { title: string; name: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto flex w-fit flex-col items-center"
    >
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center shadow-md transition hover:shadow-lg">
            <p className="text-sm font-semibold text-amber-600">{title}</p>
            <p className="text-gray-800">{name}</p>
        </div>
    </motion.div>
);

export default function OrganizationChart() {
    return (
        <section className="relative mx-auto mt-20 max-w-6xl px-4">
            <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">Struktur Organisasi</h2>

            <div className="flex flex-col items-center space-y-12">
                {/* Komisaris */}
                <Card title="Komisaris" name={orgData.komisaris} />

                {/* Direktur */}
                <div className="relative">
                    <div className="absolute top-0 left-1/2 h-10 w-0.5 -translate-x-1/2 bg-gray-300"></div>
                    <Card title="Direktur Utama" name={orgData.direktur} />
                </div>

                {/* Middle layer */}
                <div className="relative grid gap-6 md:grid-cols-3">
                    <Card title="HRD" name={orgData.hrd} />
                    <Card title="Safety / K3" name={orgData.safety} />
                    <Card title="Project Coordinator" name={orgData.coordinator} />
                </div>

                {/* Purchasing & Finance */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card title="Purchasing" name={orgData.purchasing} />
                    <Card title="Administrasi & Keuangan" name={orgData.finance} />
                </div>
            </div>
        </section>
    );
}
