import { SPACE_MEMORIA_LANDING_COPY_FR, SPACE_MEMORIA_METADATA_COPY_FR } from "@/copy/landing/fr";
import { SPACE_MEMORIA_LANDING_COPY_EN, SPACE_MEMORIA_METADATA_COPY_EN } from "@/copy/landing/en";

export type LandingLocale = "fr" | "en";

export function getLandingCopy(locale: LandingLocale) {
    if (locale === "en") {
        return SPACE_MEMORIA_LANDING_COPY_EN;
    }

    return SPACE_MEMORIA_LANDING_COPY_FR;
}

export function getLandingMetadataCopy(locale: LandingLocale) {
    if (locale === "en") {
        return SPACE_MEMORIA_METADATA_COPY_EN;
    }

    return SPACE_MEMORIA_METADATA_COPY_FR;
}
