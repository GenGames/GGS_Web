# GGS_Web

## Adding jazz
1. Duplicate the prefab JSON in the data folder of the ytpe you want to add (ex: article, Game, Team member)
2. name the file in Title Case (first letter of each word upper case) without spaces, make sure it has the file type ".json" (case matters)
3. Fill in the information for the new item in the json you just created. If you don't know how to edit JSON and want to learn, read [JSON Rules by Omar Elgabry](https://medium.com/omarelgabrys-blog/json-in-a-nutshell-7d638dfea7cc), he does a good job at explaining the basics. Otherwise just chat with Mason.
4. to ensure you do not break anything, validate your JSON, I'd recommend using [JSON Lint, a JSON validator site](https://jsonlint.com/)
5. once you know your JSON is valid and you have filled out all of the info, add the file name (without the file extension) of the JSON you made to the appropriate category in 'index.json'. Make sure it is a string in double quotes, it matches your file name (case matters), and it is in the right category both in the folders and in the index.
6. push your changes, give it up to 10 minutes to refresh the data, and you should see your item added to the list.

## Some other notes
- If you don't know how to edit JSON data, send Mason a txt, word, excel, or another text doc that has all the information labelled and filled out and he will add it for you
- Make sure you put your images under the assets folder in the right location. Otherwise errors might occur, for adding images to the JSON, make sure you copy the full local path (case matters)
- DO NOT EDIT THE HTML, CSS, OR JAVASCRIPT files without talking to Mason first, there is *a lot* happening on the back end of this, and even very very minor changes such as adding a random space or line break to the html can *botch* the entire site.
