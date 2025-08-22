import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowUpRight } from 'lucide-react';

export default function FAQSection() {
    return (
        <section className="mx-auto flex max-w-4xl flex-col gap-5 px-4 py-16">
            <span className="flex items-center justify-center gap-2 font-semibold text-amber-600">
                Frequently Asked Question
                <ArrowUpRight className="h-4 w-4 text-amber-600" />
            </span>
            <h2 className="mb-8 text-center text-3xl font-bold">
                FAQ PT. PMP Karya Mandiri <br /> Kota Cilegon
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="sustainability">
                    <AccordionTrigger>Bagaimana perusahaan Anda berkontribusi pada pembangunan berkelanjutan?</AccordionTrigger>
                    <AccordionContent>
                        Kami berkontribusi pada pembangunan berkelanjutan melalui proyek-proyek yang ramah lingkungan dan inovatif.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="partnership">
                    <AccordionTrigger>Bagaimana cara mengajukan penawaran kerjasama dengan perusahaan konstruksi Anda?</AccordionTrigger>
                    <AccordionContent>
                        Silakan hubungi kami melalui formulir kontak di website atau melalui kontak yang tersedia untuk mendapatkan informasi lebih
                        lanjut tentang kerjasama.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ethics">
                    <AccordionTrigger>Apakah perusahaan Anda memiliki kebijakan terkait etika dan integritas?</AccordionTrigger>
                    <AccordionContent>
                        Kami memiliki komitmen tinggi terhadap etika dan integritas dalam setiap aspek bisnis dan hubungan kerja dengan mitra dan
                        klien.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rnd">
                    <AccordionTrigger>Apakah perusahaan Anda memiliki proyek-proyek riset dan pengembangan?</AccordionTrigger>
                    <AccordionContent>
                        Ya, kami terlibat dalam proyek riset dan pengembangan untuk menghasilkan solusi inovatif dalam industri konstruksi.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="regulation">
                    <AccordionTrigger>Apakah perusahaan Anda memiliki kebijakan untuk mematuhi regulasi konstruksi?</AccordionTrigger>
                    <AccordionContent>
                        Kami tunduk pada semua regulasi dan standar keselamatan konstruksi yang berlaku, dan memastikan setiap proyek kami memenuhi
                        persyaratan hukum dan peraturan.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="customer-satisfaction">
                    <AccordionTrigger>Bagaimana perusahaan Anda memastikan kepuasan pelanggan?</AccordionTrigger>
                    <AccordionContent>
                        Kami berkomitmen untuk memberikan layanan yang memenuhi atau melampaui harapan pelanggan, dengan mendengarkan masukan dan
                        umpan balik secara terus-menerus.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="references">
                    <AccordionTrigger>Bagaimana cara melacak referensi atau testimoni dari klien sebelumnya?</AccordionTrigger>
                    <AccordionContent>
                        Anda dapat melihat referensi atau testimoni dari klien sebelumnya melalui website kami atau dengan menghubungi tim kami.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="gender-equality">
                    <AccordionTrigger>Apakah perusahaan Anda memiliki kebijakan untuk mendukung kesetaraan gender?</AccordionTrigger>
                    <AccordionContent>
                        Kami memiliki komitmen untuk mendukung kesetaraan gender dan menciptakan lingkungan kerja yang inklusif dan beragam.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="conflict-management">
                    <AccordionTrigger>Bagaimana perusahaan Anda mengelola konflik dalam proyek?</AccordionTrigger>
                    <AccordionContent>
                        Kami memiliki tim manajemen konflik yang terlatih untuk mengelola dan menyelesaikan konflik dengan cara yang konstruktif dan
                        berpihak pada solusi terbaik.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}
