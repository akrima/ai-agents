#!/usr/bin/env python3

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


DOCS_DIR = Path("./docs")


def contains_markdown(directory: Path) -> bool:
    return any(
        p.is_file() and p.suffix.lower() in {".md", ".markdown"}
        for p in directory.rglob("*")
    )


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def main() -> int:
    if DOCS_DIR.exists():
        if contains_markdown(DOCS_DIR):
            print("Le dossier ./docs contient déjà des fichiers Markdown. Aucun clone/pull effectué.")
            return 0
    else:
        DOCS_DIR.mkdir(parents=True, exist_ok=True)

    repo_url = input("Entrez l'URL du repo GitHub de documentation: ").strip()

    if not repo_url:
        print("URL vide. Annulation.", file=sys.stderr)
        return 1

    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        repo_dir = tmp_path / "repo"

        print("Clonage temporaire du repo de documentation...")
        run(["git", "clone", "--depth", "1", repo_url, str(repo_dir)])

        has_files = any(repo_dir.iterdir())
        if not has_files:
            print("Le repo cloné semble vide.", file=sys.stderr)
            return 1

        print("Copie du contenu vers ./docs ...")
        for item in repo_dir.iterdir():
            destination = DOCS_DIR / item.name
            if destination.exists():
                if destination.is_dir():
                    shutil.rmtree(destination)
                else:
                    destination.unlink()

            if item.is_dir():
                shutil.copytree(item, destination)
            else:
                shutil.copy2(item, destination)

    print("Documentation importée dans ./docs")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())