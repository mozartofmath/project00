
var mongoc = require('mongodb').MongoClient;
var con = 'mongodb://localhost:27017/Dictionary';

var dict = {"PRIME":"A positive integer that has no trivial factors","COMPOSITE":"A positive integer that has trivial factors","GRAVITY":"Curvature of spacetime","SET THEORY":"The branch of mathematics that studies sets","TOPOLOGY":"meh","DIPLOBLASTIC":"Characterizing the ovum when it has two primary germinallayers.","DEFIGURE":"To delineate. [Obs.]These two stones as they are here defigured. Weever.","LOMBARD":"Of or pertaining to Lombardy, or the inhabitants of Lombardy.","BAHAISM":"The religious tenets or practices of the Bahais.","FUMERELL":"See Femerell.","ROYALET":"asafdsgfgdfshhgh","TROPHIED":"Adorned with trophies.The trophied arches, storied halls, invade. Pope.","ZEQUIN":"See Sequin.","MILLWRIGHT":"A mechanic whose occupation is to build mills, or to set uptheir machinery.","PHOTOGRAPHOMETER":"An instrument for determining the sensibility of the platesemployed in photographic processes to luminous rays.","SCHEELIUM":"The metal tungsten. [Obs.]","ALVEOLATE":"Deeply pitted, like a honeycomb.","LIMULUS":"The only existing genus of Merostomata. It includes only a fewspecies from the East Indies, and one (Limulus polyphemus) from theAtlantic coast of North America. Called also Molucca crab, king crab,horseshoe crab, and horsefoot.","OSMUND":"A fern of the genus Osmunda, or flowering fern. The mostremarkable species is the osmund royal, or royal fern (Osmundaregalis), which grows in wet or boggy places, and has large bipinnatefronds, often with a panicle of capsules at the top. The rootstockcontains much starch, and has been used in stiffening linen.","POTTEEN":"See Poteen.","UNDERRUN":"To run or pass under; especially (Naut.), to pass along andunder, as a cable, for the purpose of taking it in, or of examiningit.","EMPLASTIC":"Fit to be applied as a plaster; glutinous; adhesive; as,emplastic applications.","RHYTHMICS":"The department of musical science which treats of the length ofsounds.","PLEUROPTERA":"A group of Isectivora, including the colugo.","UNBLOODY":"Not bloody. Dryden. Unbloody sacrifice. (a) A sacrifice inwhich no victim is slain. (b) (R. C. Ch.) The Mass.","CINCINNUS":"A form of monochasium in which the lateral branches arisealternately on opposite sides of the false axis; -- called alsoscorpioid cyme. --Cin*cin\"nal (#), a.","INDOCILITY":"The quality or state of being indocile; dullness of intellect;unteachableness; intractableness.The stiffness and indocility of the Pharisees. W. Montagu.","TELEOCEPHIAL":"An extensive order of bony fishes including most of the commonmarket species, as bass, salmon, cod, perch, etc.","CANEBRAKE":"A thicket of canes. Ellicott.","QUININIC":"Pertaining to, or designating, a nitrogenous acid obtained as ayellow crystalline substance by the oxidation of quinine.","RICINIC":"Pertaining to, or derived from, castor oil; formerly,designating an acid now called ricinoleic acid.","TELLURAL":"Of or pertaining to the earth. [R.]","OTHERNESS":"The quality or state of being other or different; alterity;oppositeness.","FASCICLE":"A small bundle or collection; a compact cluster; as, a fascicleof fibers; a fascicle of flowers or roots.","REENJOYMENT":"Renewed enjoiment.","LONGIROSTER":"One of the Longirostres.","RHAPSODIZE":"To utter as a rhapsody, or in the manner of a rhapsody Sterne.","WATER VIOLET":"See under Violet.","TRUNCHEONED":"Having a truncheon.","PROGENY":"genetic information of a community"};

var users = {"joey":"$2a$05$rkJcNUL4oGZfwzgj9K8Kc.455GAinrB3aN68mqXwYycowNy2TOMge","jimmy":"$2a$05$RoUNszrS0JtPy/wjkTNdf.nRRDJPkNsKFttPHVBR6vlJEWe.l00hC","java":"$2a$05$BzbfqM2a9FSis05OTloJ5ujL9GyP7xoTCtAOCfzo84Pm//HagdpT.","abc":"$2a$05$7ImE1r5k17xKspCLzSdIROH5zZcbsQ4IM2k3z9.Yxfizje3pZLS9y"};

var tokens = {"joey":"$2a$10$hIpCsKFfSGyXNVwx5FjCy.HrR0M8Cs8Mk95aHoCVfg5Tl4dnMm5mO","jimmy":"$2a$10$eWQoSdOTs2BelSltqsAA8epUlDMcqzccyrK97cprNz3XF/hcJNq5W","java":"$2a$10$vdcU2y9x4fw8co2HJm8KJuOoDuhFahedkZuAAvFyk5ClQIz5bezba","abc":"$2a$10$heT55qzUKSfNCYd8TdQUTeXpyncPKpOOXdBrjPb43iFHoMHHUrHou"};


const coll = "dict";
mongoc.connect(con, (err,db)=>{
    console.log("connected to dict");
    const collection = db.collection(coll);

    collection.remove();
    collection.insertOne(dict,(err,res)=>{
        if (err){console.log(err);}
        db.close(); 
    });
});

const col1 = "users";
mongoc.connect(con, (err,db)=>{
    console.log("connected to users");
    const collection = db.collection(col1);

    collection.remove();
    collection.insertOne(users,(err,res)=>{
        if (err){console.log(err);}
        db.close(); 
    });
});

const col2 = "tokens";
mongoc.connect(con, (err,db)=>{
    console.log("connected to tokens");
    const collection = db.collection(col2);

    collection.remove();
    collection.insertOne(tokens,(err,res)=>{
        if (err){console.log(err);}
        db.close(); 
    });
});