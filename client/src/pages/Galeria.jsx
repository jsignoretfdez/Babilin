import { Helmet } from 'react-helmet-async';

const Galeria = () => {
  return (
    <>
      <Helmet>
        <title>Galería de Instalaciones | Babilín Escuela Infantil Madrid</title>
        <meta name="description" content="Conoce las instalaciones de Babilín: aulas luminosas, patio exterior, comedor y espacios de juego. Escuela infantil bilingüe en Lucero, Madrid." />
        <meta property="og:title" content="Galería de Instalaciones | Babilín Escuela Infantil Madrid" />
        <meta property="og:description" content="Aulas, patio, comedor y zonas comunes de Babilín. Escuela infantil bilingüe en Madrid (Lucero)." />
        <meta property="og:url" content="https://babilin.es/galeria" />
        <link rel="canonical" href="https://babilin.es/galeria" />
      </Helmet>
      <div className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 max-w-[1280px] mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">Nuestras Instalaciones</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Explora los espacios donde tus pequeños aprenden, juegan y crecen cada día. Un entorno seguro, luminoso y diseñado para su desarrollo integral.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 auto-rows-[250px]">
        {/* Aula Monitos (Large) */}
        <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(190,217,238,0.15)] group bg-surface-container-lowest border border-surface-container cursor-pointer transition-all hover:-translate-y-1">
          <img loading="lazy" alt="Aula Monitos - espacio de aprendizaje para niños de 0 a 1 año" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5ywlTEl7YjvP2xyWp1Ik5eDlZe4odotqKp4SRrwOULUbxCnq-IFnwOxZW_R0eFchgjxv6wGHReYTf4V5UIeMZp8kSPAzll20dGOJ_yjXMkqSbqvQRgMOXAcevknq0PxZAoJcU5KNhDwgD14HvqZb0jlp4DQSfBU0Rm9Yrgw7tBfSG0AuzIU26B1gHjn3rS0nfaQFGhD3flGz_SRHaonGV0wTcp86iYYy1uB-uIKcStgb6VHOK5JyLrzHAyHcY0I7DzsGdrRdbV98" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <span className="inline-block bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm px-3 py-1 rounded-full mb-2">0-1 Años</span>
            <h3 className="font-headline-md text-headline-md text-white">Aula Monitos</h3>
          </div>
        </div>

        {/* Aula Leones */}
        <div className="relative rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(190,217,238,0.15)] group bg-surface-container-lowest border border-surface-container cursor-pointer transition-all hover:-translate-y-1">
          <img loading="lazy" alt="Aula Leones - aula para niños de 1 a 2 años" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS5MFjJSFmJpBA9H8Bt1kzf9ZUR_vtGQO2B2OcCsqAUw1OE79iWmGiTNfzgZC7oANw8wQnBgJvWecVrMft__XRm72GSlsqXNbEhOh5VuG8HZvMbnFvNkjfHT7ggn_Il28oyW9EXI4NukreaPYd6iWknPcNmunxc7DciBvZr7o8gl6vxEUR7M1UZfrgnoEdgZDyAvK877a5ZpUeffJ11cDu6I5P-kH7Ee80n3gS0PZT7fWxA3r5c_jZ5BOAdzcvc_ABZJMVT_SZne4" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-block bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-3 py-1 rounded-full mb-2">1-2 Años</span>
            <h3 className="font-headline-sm text-headline-sm text-white">Aula Leones</h3>
          </div>
        </div>

        {/* Aula Ositos */}
        <div className="relative rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(190,217,238,0.15)] group bg-surface-container-lowest border border-surface-container cursor-pointer transition-all hover:-translate-y-1">
          <img loading="lazy" alt="Aula Ositos - espacio para bebés de 0 a 1 año" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCurWYsDnTDvBx0i-m96g_Z9IhwPcJspt1N8cHQ9ZbVIf85xOdmkhMuKZcKF1aPafLRgtV13z-Hl3zFvgJkmc61vKngg9_ixcx3-mitGGDKYROSdWpneAbh8O2sr9Hv8kc7tQToCS8tJ-AFrAiI_22ayMgns6RNH5mOmIGLfv-vGGqKeCRzYA2ahdBancwMkNDlKt6Aj_TOWl6Z1QeoOWRuldPU-Uel2k3M4p3_Dda2v-6k2R4O2xqcydAGeGrdGz8BVG98mFoPWEU" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-block bg-primary-container text-on-primary-container font-label-sm text-label-sm px-3 py-1 rounded-full mb-2">2-3 Años</span>
            <h3 className="font-headline-sm text-headline-sm text-white">Aula Ositos</h3>
          </div>
        </div>

        {/* Patio */}
        <div className="md:col-span-2 relative rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(190,217,238,0.15)] group bg-surface-container-lowest border border-surface-container cursor-pointer transition-all hover:-translate-y-1">
          <img loading="lazy" alt="Patio exterior de la escuela infantil con zonas de juego" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8WO2hfk9p_7aUJp0r3bhXBb9bl15zCIywGFBwVOwUZ-wLyeqQYp9c4-DUjISBclG66ISL3cmhJpfFN07VWW6zLGHebZcfaG1MMBHgFIDjGH9pwGNNmoFDNtQ3Mhw-ADUE2Alb1Sm6i_0nIwXEidnQGEwDnKC4o1lT-WkDIIxPpsyahfLgsTHiY2EZCdNi7n2O2vyxK3oEEU1qUjZP0ZnkeF6jVexeN4NRg3HKsq2TDrMr8wFfAtK7spm0jne-adJLwoBfnGNe254" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <span className="inline-block bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm px-3 py-1 rounded-full mb-2">Zonas Comunes</span>
            <h3 className="font-headline-md text-headline-md text-white">Patio Exterior</h3>
          </div>
        </div>

        {/* Comedor */}
        <div className="relative rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(190,217,238,0.15)] group bg-surface-container-lowest border border-surface-container cursor-pointer transition-all hover:-translate-y-1">
          <img loading="lazy" alt="Comedor infantil con mesas y sillas adaptadas para niños" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHO7fOHEnwAYnChuLtw2Er9uarp2cDYYapnp1zCkfWfqJPN8SbL6u0LrOgtfwBLz3urGM5ImTnhqh5mOyLV4lvM82M-o4CMotsGGM47zWXv6fyrJ1ax7xNvpo_SvBpCETkgKR1-FHuyfpOItXHa4Ys1Qj6gQgEaZjIhG2hfRKnSMVBDV0aHq6uwrHqZpe2o-gx94m1wywBJGTIKSk5pg2X9RvFq2-OHLXCGsqdUm-9OVozXOcGu68_vcunHmxjSbhu5enOlxamdFI" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-block bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-3 py-1 rounded-full mb-2">Zonas Comunes</span>
            <h3 className="font-headline-sm text-headline-sm text-white">Comedor</h3>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Galeria;
