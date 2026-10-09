"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "./Icon";
import { PACKS, xof, type PackId } from "@/lib/site";

// « Quel pack est fait pour vous ? » : une phrase « Je veux… » par pack, on recommande celui qui correspond.
export default function PackQuiz() {
  const [pick, setPick] = useState<PackId | null>(null);
  const pack = PACKS.find((p) => p.id === pick);

  return (
    <div className="quiz on-navy" id="quel-pack">
      <p className="eyebrow">Choisir son pack</p>
      <h2 className="h-l">
        Quel pack est <em>fait pour vous ?</em>
      </h2>
      <p className="lead mt-s">Choisissez la phrase qui vous ressemble le plus.</p>

      <div className="quiz-opts" role="group" aria-label="Ce que vous voulez">
        {PACKS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="quiz-opt"
            aria-pressed={pick === p.id}
            onClick={() => setPick(p.id)}
          >
            <span className="dot" aria-hidden="true" />
            <span>« {p.want} »</span>
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {pack && (
          <div className="quiz-result">
            <div>
              <span className="pack-name">Pack recommandé</span>
              <p className="pack-price">
                {pack.name} · {xof(pack.price)}
              </p>
              <p className="muted mb-0">{pack.short}</p>
            </div>
            <div className="btn-row">
              <Link href={`/coaching/inscription?pack=${pack.id}`} className="btn btn-gold">
                S&apos;inscrire à ce pack <Icon name="arrow" />
              </Link>
              <a href={`#${pack.id}`} className="btn btn-ghost">
                Voir le détail
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
