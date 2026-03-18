# Ask-Question Flow

Ask exactly these questions before review:

1. Quelle version de Java veux-tu cibler ?
   Exemples : 11, 17, 21

2. Quel est le dossier principal à analyser ?
   Il doit idéalement contenir :
   - `src/main`
   - `src/test`
   - `checkstyle.xml`
   - `settings.xml`
   - `pom.xml` ou `build.gradle`

3. Quel type de projet est-ce ?
   - AWS Lambda
   - Spring Boot
   - Spring Boot sur EKS
   - batch
   - consumer / event-driven
   - API
   - autre

4. Veux-tu seulement un rapport Markdown, ou aussi des suggestions de correction ?

5. Veux-tu une validation stricte des standards même si le code compile déjà ?

6. Si `./docs` contient de la documentation architecturale ou business, faut-il l’utiliser comme baseline de validation ?