"use client";

// Les 7 packs en escalier : chaque marche est plus haute que la précédente et dit ce qu'elle ajoute.
// On choisit sa marche, le détail du pack s'affiche dessous.
// Tous les détails sont rendus dans la page (masqués sauf le choisi) pour fonctionner aussi sans hydratation.
import Link from "next/link";
import { useState } from "react";
import Icon from "./Icon";
import { Ticks } from "./ui";
import { PACKS, xof } from "@/lib/site";

export default function PackStairs() {
  const [sel, setSel] = useState(2);

  return (
    <div className="stairs-wrap">
      <div className="stairs rv" role="group" aria-label="Choisir un pack, du plus simple au plus complet">
        {PACKS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className="stair"
            data-pack={p.id}
            aria-pressed={sel === i}
            aria-controls="stair-detail"
            style={{ "--i": i } as React.CSSProperties}
            onClick={() => setSel(i)}
          >
            <span className="here" aria-hidden="true">Vous</span>
            <span className="stair-n" aria-hidden="true">0{i + 1}</span>
            <span className="stair-top">
              <b>{p.name}</b>
              <span>{xof(p.price)}</span>
            </span>
            <span className="stair-plus">{p.plus}</span>
          </button>
        ))}
      </div>
      <p className="stairs-axis" aria-hidden="true">
        <span>Faire le point</span>
        <span>Être accompagné 3 mois</span>
      </p>

      <div id="stair-detail" aria-live="polite">
        {PACKS.map((p, i) => (
          <div key={p.id} className="stair-detail" data-detail={p.id} hidden={sel !== i}>
            <div>
              <span className="pack-name">
                Pack {p.name}
                {p.featured ? " · le plus complet pour démarrer" : ""}
              </span>
              <p className="pk-price">{xof(p.price)}</p>
              <p className="pack-want">« {p.want} »</p>
              <div className="btn-row">
                <Link href={`/coaching/inscription?pack=${p.id}`} className="btn btn-gold">
                  S&apos;inscrire <Icon name="arrow" />
                </Link>
                <Link href={`/coaching/packs#${p.id}`} className="btn btn-ghost">
                  Tout le détail
                </Link>
              </div>
            </div>
            <div>
              <h3>Ce que vous obtenez</h3>
              <Ticks items={p.gets} />
            </div>
            <div>
              <h3>{p.detailTitle}</h3>
              <Ticks items={p.details} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
