import { auth, db } from "@/libs/firebase-config";
import { Acompanhante } from "@/types/Acompanhante";
import { Mail } from "@/types/Mail";
import { Post } from "@/types/Post";
import { collapseClasses } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { StorageReference, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { link } from "fs";
import { url } from "inspector";

export const api = {
    auth: {
        signIn: async (email: string, senha: string): Promise<{ error: boolean }> => {
            return new Promise(resolve => {
                try {
                    signInWithEmailAndPassword(auth, email, senha)
                        .then(async (userCredential) => {
                            // Signed in 
                            const user = userCredential.user;

                            resolve({
                                error: false
                            })
                        })
                        .catch((error) => {
                            resolve({
                                error: true
                            })
                        });
                } catch (error: any) {
                    resolve({
                        error: true
                    })
                }
            })
        },
        //Obtendo dados do usuário logado
        getLoggedUser: async (): Promise<{ error: boolean, uid?: string, email?: string | null }> => {
            return new Promise(resolve => {
                try {
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            resolve({
                                error: false,
                                uid: user.uid,
                                email: user.email
                            })
                            // ...
                        } else {
                            // User is signed out
                            // ...
                            resolve({
                                error: true
                            })
                        }
                    });
                } catch (error) {
                    resolve({
                        error: true
                    })
                }

            })
        },
        //Cadastrar Login no sistema
        signUp: async (email: string, senha: string): Promise<{ error: boolean }> => {
            return new Promise(resolve => {
                createUserWithEmailAndPassword(auth, email, senha)
                    .then((userCredential) => {
                        resolve({
                            error: false
                        })
                    })
                    .catch((error) => {
                        resolve({
                            error: true
                        })
                    });
            })
        },
        signOut: async (): Promise<{ error: boolean }> => {
            return new Promise(resolve => {
                const auth = getAuth();
                signOut(auth).then(() => {
                    // Sign-out successful.
                    resolve({
                        error: false
                    })
                }).catch((error) => {
                    // An error happened.
                    resolve({
                        error: true
                    })
                });
            })
        },
        updatePassword: async (newPassword: string): Promise<{ error: boolean }> => {
            return new Promise(async resolve => {
                const auth = getAuth();

                const user = auth.currentUser;

                if (user) {
                    updatePassword(user, newPassword).then(() => {
                        resolve({
                            error: false
                        })
                    }).catch((error) => {
                        console.log(error)
                        resolve({
                            error: true
                        })
                    });
                }

            })
        }
    },
    acompanhante: {
        insert: async (item: Acompanhante): Promise<{ error: boolean, id: string | null }> => {
            return new Promise(async resolve => {
                try {
                    const set = await addDoc(collection(db, 'acompanhantes'), {
                        nickname: item.nickname,
                        plano: item.plano,
                        cidade: item.cidade,
                        nome: item.nome,
                        destaque: item.destaque,
                        nome_social: item.nome_social,
                        nascimento: item.nascimento,
                        whatsapp: item.whatsapp,
                        genero: item.genero,
                        genitalia: item.genitalia,
                        orientacao: item.orientacao,
                        comportamento: item.comportamento,
                        altura: item.altura,
                        peso: item.peso,
                        pe: item.pe,
                        etnia: item.etnia,
                        olhos: item.olhos,
                        estiloCabelo: item.estiloCabelo,
                        corCabelo: item.corCabelo,
                        silicone: item.silicone,
                        tatuagem: item.tatuagem,
                        piercing: item.piercing,
                        descricao: item.descricao,
                        local: item.local,
                        endereco: item.endereco,
                        servicos: item.servicos,
                        midia: item.midia,
                        valores: item.valores,
                        status: item.status
                    })

                    if (set.id) {
                        resolve({
                            error: false,
                            id: set.id
                        })
                    }
                } catch (error) {
                    console.log(error)
                    resolve({
                        error: true,
                        id: null
                    })
                }
            })
        },
        update: async (item: Acompanhante, id: string): Promise<{ error: boolean }> => {
            return new Promise(async resolve => {
                try {
                    const docRef = doc(db, `acompanhantes/${id}`)
                    await updateDoc(docRef, {
                        plano: item.plano,
                        cidade: item.cidade,
                        nome: item.nome,
                        destaque: item.destaque,
                        nome_social: item.nome_social,
                        nascimento: item.nascimento,
                        whatsapp: item.whatsapp,
                        genero: item.genero,
                        genitalia: item.genitalia,
                        orientacao: item.orientacao,
                        comportamento: item.comportamento,
                        altura: item.altura,
                        peso: item.peso,
                        pe: item.pe,
                        etnia: item.etnia,
                        olhos: item.olhos,
                        estiloCabelo: item.estiloCabelo,
                        corCabelo: item.corCabelo,
                        silicone: item.silicone,
                        tatuagem: item.tatuagem,
                        piercing: item.piercing,
                        descricao: item.descricao,
                        local: item.local,
                        endereco: item.endereco,
                        servicos: item.servicos,
                        midia: item.midia,
                        valores: item.valores
                    })

                    resolve({
                        error: false
                    })
                } catch (error) {
                    resolve({
                        error: true
                    })
                }
            })
        },
        getPhotoFiles: async (id: string): Promise<{ error: boolean, list: StorageReference[] }> => {
            return new Promise(async (resolve) => {
                try {
                    const storage = getStorage();
                    const listRef = ref(storage, `media/acompanhantes/${id}/photos`);
                    const links: string[] = []

                    const results = await listAll(listRef)

                    resolve({
                        error: false,
                        list: results.items
                    })

                } catch (error) {
                    console.log(error)
                    resolve({
                        error: true,
                        list: []
                    })
                }
            });
        },
        getVideoFiles: async (id: string): Promise<{ error: boolean, list: StorageReference[] }> => {
            return new Promise(async (resolve) => {
                try {
                    const storage = getStorage();
                    const listRef = ref(storage, `media/acompanhantes/${id}/videos`);
                    const links: string[] = []

                    const results = await listAll(listRef)

                    resolve({
                        error: false,
                        list: results.items
                    })

                } catch (error) {
                    console.log(error)
                    resolve({
                        error: true,
                        list: []
                    })
                }
            });
        },
        uploadMidia: async (file: File, id: string): Promise<{ error: boolean, url: string | null }> => {
            return new Promise(resolve => {
                try {
                    const storage = getStorage();

                    setTimeout(async () => {
                        const fileRef = ref(storage, `media/acompanhantes/${id}/${file.name}`);
                        const snapshot = await uploadBytes(fileRef, file);
                        const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath));

                        resolve({
                            error: false,
                            url: url
                        })
                    })

                } catch (error) {
                    resolve({
                        error: true,
                        url: null
                    })
                }
            })
        },
        uploadPhotos: async (file: File, id: string): Promise<{ error: boolean, url: string | null }> => {
            return new Promise(resolve => {
                try {
                    const storage = getStorage();

                    setTimeout(async () => {
                        const fileRef = ref(storage, `media/acompanhantes/${id}/photos/${file.name}`);
                        const snapshot = await uploadBytes(fileRef, file);
                        const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath));

                        resolve({
                            error: false,
                            url: url
                        })
                    })

                } catch (error) {
                    resolve({
                        error: true,
                        url: null
                    })
                }
            })
        },
        uploadVideos: async (file: File, id: string): Promise<{ error: boolean, url: string | null }> => {
            return new Promise(resolve => {
                try {
                    const storage = getStorage();

                    setTimeout(async () => {
                        const fileRef = ref(storage, `media/acompanhantes/${id}/videos/${file.name}`);
                        const snapshot = await uploadBytes(fileRef, file);
                        const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath));

                        resolve({
                            error: false,
                            url: url
                        })
                    })

                } catch (error) {
                    resolve({
                        error: true,
                        url: null
                    })
                }
            })
        },
        updateMidiaAfterRegister: async (id: string, perfil: string, banner: string, card: string, comparacao: string): Promise<{ success: boolean }> => {
            return new Promise(async resolve => {
                try {
                    const docRef = doc(db, `acompanhantes/${id}`)
                    const snapshot = await getDoc(docRef)

                    if (snapshot.exists()) {
                        let current = {
                            facebook: snapshot.data().midia.facebook,
                            instagram: snapshot.data().midia.instagram,
                            tiktok: snapshot.data().midia.tiktok,
                            perfil: perfil,
                            banner: banner,
                            card: card,
                            comparacao: comparacao
                        }

                        await updateDoc(docRef, {
                            midia: current
                        })

                        resolve({ success: true })

                    } else {
                        resolve({ success: false })
                    }

                } catch (error) {
                    console.log(error)

                }
            })
        },
        getAll: async (location?: string): Promise<{ error: boolean, list: Acompanhante[] }> => {
            return new Promise(async resolve => {
                if (location) {
                    try {
                        const busca = query(collection(db, 'acompanhantes'), where(' cidade', '==', location))
                        const snapshot = await getDocs(busca)
                        const result: Acompanhante[] = []

                        if (snapshot.empty) {
                            resolve({
                                error: false,
                                list: []
                            })
                        } else {
                            snapshot.forEach((element) => {
                                let current: Acompanhante = {
                                    id: element.id,
                                    nickname: element.data().nickname,
                                    destaque: element.data().destaque,
                                    cidade: element.data().cidade,
                                    nome: element.data().nome,
                                    nome_social: element.data().nome_social,
                                    nascimento: element.data().nascimento,
                                    whatsapp: element.data().whatsapp,
                                    genero: element.data().genero,
                                    genitalia: element.data().genitalia,
                                    orientacao: element.data().orientacao,
                                    comportamento: element.data().comportamento,
                                    altura: element.data().altura,
                                    peso: element.data().peso,
                                    pe: element.data().pe,
                                    etnia: element.data().etnia,
                                    olhos: element.data().olhos,
                                    estiloCabelo: element.data().estiloCabelo,
                                    corCabelo: element.data().corCabelo,
                                    silicone: element.data().silicone,
                                    tatuagem: element.data().tatuagem,
                                    piercing: element.data().piercing,
                                    descricao: element.data().descricao,
                                    servicos: element.data().servicos,
                                    midia: element.data().midia,
                                    plano: element.data().plano,
                                    local: element.data().local,
                                    endereco: element.data().endereco,
                                    valores: element.data().valores,
                                    status: element.data().status
                                }

                                result.push(current)
                            })

                            resolve({
                                error: false,
                                list: result
                            })
                        }
                    } catch (error) {
                        console.log(error)
                        resolve({
                            error: true,
                            list: []
                        })
                    }
                } else {
                    try {
                        const busca = query(collection(db, 'acompanhantes'))
                        const snapshot = await getDocs(busca)
                        const result: Acompanhante[] = []

                        if (snapshot.empty) {
                            resolve({
                                error: false,
                                list: []
                            })
                        } else {
                            snapshot.forEach((element) => {
                                let current: Acompanhante = {
                                    id: element.id,
                                    nickname: element.data().nickname,
                                    destaque: element.data().destaque,
                                    cidade: element.data().cidade,
                                    nome: element.data().nome,
                                    nome_social: element.data().nome_social,
                                    nascimento: element.data().nascimento,
                                    whatsapp: element.data().whatsapp,
                                    genero: element.data().genero,
                                    genitalia: element.data().genitalia,
                                    orientacao: element.data().orientacao,
                                    comportamento: element.data().comportamento,
                                    altura: element.data().altura,
                                    peso: element.data().peso,
                                    pe: element.data().pe,
                                    etnia: element.data().etnia,
                                    olhos: element.data().olhos,
                                    estiloCabelo: element.data().estiloCabelo,
                                    corCabelo: element.data().corCabelo,
                                    silicone: element.data().silicone,
                                    tatuagem: element.data().tatuagem,
                                    piercing: element.data().piercing,
                                    descricao: element.data().descricao,
                                    servicos: element.data().servicos,
                                    midia: element.data().midia,
                                    plano: element.data().plano,
                                    local: element.data().local,
                                    endereco: element.data().endereco,
                                    valores: element.data().valores,
                                    status: element.data().status
                                }

                                result.push(current)
                            })

                            resolve({
                                error: false,
                                list: result
                            })
                        }
                    } catch (error) {
                        console.log(error)
                        resolve({
                            error: true,
                            list: []
                        })
                    }
                }

            })
        },
        getDestaques: async (location?: string): Promise<{ error: boolean, list: Acompanhante[] }> => {
            return new Promise(async resolve => {
                if (location) {
                    try {
                        const busca = query(collection(db, 'acompanhantes'), and(where('destaque', '==', true), where('cidade', '==', location), where('status', '==', true)))
                        const snapshot = await getDocs(busca)
                        const result: Acompanhante[] = []

                        if (snapshot.empty) {
                            resolve({
                                error: false,
                                list: []
                            })
                        } else {
                            snapshot.forEach((element) => {
                                let current: Acompanhante = {
                                    id: element.id,
                                    nickname: element.data().nickname,
                                    destaque: element.data().destaque,
                                    cidade: element.data().cidade,
                                    nome: element.data().nome,
                                    nome_social: element.data().nome_social,
                                    nascimento: element.data().nascimento,
                                    whatsapp: element.data().whatsapp,
                                    genero: element.data().genero,
                                    genitalia: element.data().genitalia,
                                    orientacao: element.data().orientacao,
                                    comportamento: element.data().comportamento,
                                    altura: element.data().altura,
                                    peso: element.data().peso,
                                    pe: element.data().pe,
                                    etnia: element.data().etnia,
                                    olhos: element.data().olhos,
                                    estiloCabelo: element.data().estiloCabelo,
                                    corCabelo: element.data().corCabelo,
                                    silicone: element.data().silicone,
                                    tatuagem: element.data().tatuagem,
                                    piercing: element.data().piercing,
                                    descricao: element.data().descricao,
                                    servicos: element.data().servicos,
                                    midia: element.data().midia,
                                    plano: element.data().plano,
                                    local: element.data().local,
                                    endereco: element.data().endereco,
                                    valores: element.data().valores,
                                    status: element.data().status
                                }

                                result.push(current)
                            })

                            resolve({
                                error: false,
                                list: result
                            })
                        }
                    } catch (error) {
                        console.log(error)
                        resolve({
                            error: true,
                            list: []
                        })
                    }
                } else {
                    try {
                        const busca = query(collection(db, 'acompanhantes'), where('destaque', '==', true))
                        const snapshot = await getDocs(busca)
                        const result: Acompanhante[] = []

                        if (snapshot.empty) {
                            resolve({
                                error: false,
                                list: []
                            })
                        } else {
                            snapshot.forEach((element) => {
                                let current: Acompanhante = {
                                    id: element.id,
                                    nickname: element.data().nickname,
                                    destaque: element.data().destaque,
                                    cidade: element.data().cidade,
                                    nome: element.data().nome,
                                    nome_social: element.data().nome_social,
                                    nascimento: element.data().nascimento,
                                    whatsapp: element.data().whatsapp,
                                    genero: element.data().genero,
                                    genitalia: element.data().genitalia,
                                    orientacao: element.data().orientacao,
                                    comportamento: element.data().comportamento,
                                    altura: element.data().altura,
                                    peso: element.data().peso,
                                    pe: element.data().pe,
                                    etnia: element.data().etnia,
                                    olhos: element.data().olhos,
                                    estiloCabelo: element.data().estiloCabelo,
                                    corCabelo: element.data().corCabelo,
                                    silicone: element.data().silicone,
                                    tatuagem: element.data().tatuagem,
                                    piercing: element.data().piercing,
                                    descricao: element.data().descricao,
                                    servicos: element.data().servicos,
                                    midia: element.data().midia,
                                    plano: element.data().plano,
                                    local: element.data().local,
                                    endereco: element.data().endereco,
                                    valores: element.data().valores,
                                    status: element.data().status
                                }

                                result.push(current)
                            })

                            resolve({
                                error: false,
                                list: result
                            })
                        }
                    } catch (error) {
                        console.log(error)
                        resolve({
                            error: true,
                            list: []
                        })
                    }
                }
            })
        },
        getGold: async (location?: string): Promise<{ error: boolean, list: Acompanhante[] }> => {
            return new Promise(async resolve => {
                if (location) {
                    try {
                        const busca = query(collection(db, 'acompanhantes'), and(where('plano', '==', 'Ouro'), where('cidade', '==', location), where('status', '==', true)))
                        const snapshot = await getDocs(busca)
                        const result: Acompanhante[] = []

                        if (snapshot.empty) {
                            resolve({
                                error: false,
                                list: []
                            })
                        } else {
                            snapshot.forEach((element) => {
                                let current: Acompanhante = {
                                    id: element.id,
                                    nickname: element.data().nickname,
                                    destaque: element.data().destaque,
                                    cidade: element.data().cidade,
                                    nome: element.data().nome,
                                    nome_social: element.data().nome_social,
                                    nascimento: element.data().nascimento,
                                    whatsapp: element.data().whatsapp,
                                    genero: element.data().genero,
                                    genitalia: element.data().genitalia,
                                    orientacao: element.data().orientacao,
                                    comportamento: element.data().comportamento,
                                    altura: element.data().altura,
                                    peso: element.data().peso,
                                    pe: element.data().pe,
                                    etnia: element.data().etnia,
                                    olhos: element.data().olhos,
                                    estiloCabelo: element.data().estiloCabelo,
                                    corCabelo: element.data().corCabelo,
                                    silicone: element.data().silicone,
                                    tatuagem: element.data().tatuagem,
                                    piercing: element.data().piercing,
                                    descricao: element.data().descricao,
                                    servicos: element.data().servicos,
                                    midia: element.data().midia,
                                    plano: element.data().plano,
                                    local: element.data().local,
                                    endereco: element.data().endereco,
                                    valores: element.data().valores,
                                    status: element.data().status
                                }

                                result.push(current)
                            })

                            resolve({
                                error: false,
                                list: result
                            })
                        }
                    } catch (error) {
                        console.log(error)
                        resolve({
                            error: true,
                            list: []
                        })
                    }
                } else {
                    try {

                        const busca = query(collection(db, 'acompanhantes'), where('plano', '==', 'Ouro'))
                        const snapshot = await getDocs(busca)
                        const result: Acompanhante[] = []

                        if (snapshot.empty) {
                            resolve({
                                error: false,
                                list: []
                            })
                        } else {
                            snapshot.forEach((element) => {
                                let current: Acompanhante = {
                                    id: element.id,
                                    nickname: element.data().nickname,
                                    destaque: element.data().destaque,
                                    cidade: element.data().cidade,
                                    nome: element.data().nome,
                                    nome_social: element.data().nome_social,
                                    nascimento: element.data().nascimento,
                                    whatsapp: element.data().whatsapp,
                                    genero: element.data().genero,
                                    genitalia: element.data().genitalia,
                                    orientacao: element.data().orientacao,
                                    comportamento: element.data().comportamento,
                                    altura: element.data().altura,
                                    peso: element.data().peso,
                                    pe: element.data().pe,
                                    etnia: element.data().etnia,
                                    olhos: element.data().olhos,
                                    estiloCabelo: element.data().estiloCabelo,
                                    corCabelo: element.data().corCabelo,
                                    silicone: element.data().silicone,
                                    tatuagem: element.data().tatuagem,
                                    piercing: element.data().piercing,
                                    descricao: element.data().descricao,
                                    servicos: element.data().servicos,
                                    midia: element.data().midia,
                                    plano: element.data().plano,
                                    local: element.data().local,
                                    endereco: element.data().endereco,
                                    valores: element.data().valores,
                                    status: element.data().status
                                }

                                result.push(current)
                            })

                            resolve({
                                error: false,
                                list: result
                            })
                        }
                    } catch (error) {
                        console.log(error)
                        resolve({
                            error: true,
                            list: []
                        })
                    }
                }

            })
        },
        getById: async (id: string): Promise<{ error: boolean, model: Acompanhante | null }> => {
            return new Promise(async resolve => {
                try {
                    const docRef = doc(db, `acompanhantes/${id}`)
                    const snapshot = await getDoc(docRef)

                    if (snapshot.exists()) {
                        let current: Acompanhante = {
                            id: snapshot.id,
                            nickname: snapshot.data().nickname,
                            destaque: snapshot.data().destaque,
                            cidade: snapshot.data().cidade,
                            nome: snapshot.data().nome,
                            nome_social: snapshot.data().nome_social,
                            nascimento: snapshot.data().nascimento,
                            whatsapp: snapshot.data().whatsapp,
                            genero: snapshot.data().genero,
                            genitalia: snapshot.data().genitalia,
                            orientacao: snapshot.data().orientacao,
                            comportamento: snapshot.data().comportamento,
                            altura: snapshot.data().altura,
                            peso: snapshot.data().peso,
                            pe: snapshot.data().pe,
                            etnia: snapshot.data().etnia,
                            olhos: snapshot.data().olhos,
                            estiloCabelo: snapshot.data().estiloCabelo,
                            corCabelo: snapshot.data().corCabelo,
                            silicone: snapshot.data().silicone,
                            tatuagem: snapshot.data().tatuagem,
                            piercing: snapshot.data().piercing,
                            descricao: snapshot.data().descricao,
                            servicos: snapshot.data().servicos,
                            midia: snapshot.data().midia,
                            plano: snapshot.data().plano,
                            local: snapshot.data().local,
                            endereco: snapshot.data().endereco,
                            valores: snapshot.data().valores,
                            status: snapshot.data().status
                        }

                        resolve({
                            error: false,
                            model: current
                        })
                    } else {
                        resolve({
                            error: false,
                            model: null
                        })
                    }
                } catch (error) {
                    console.log(error)
                    resolve({
                        error: false,
                        model: null
                    })
                }
            })
        },
        getByNickname: async (nickname: string): Promise<{ error: boolean, model: Acompanhante | null }> => {
            return new Promise(async resolve => {
                try {
                    const docQuery = query(collection(db, `acompanhantes`), where('nickname', '==', nickname))
                    const snapshot = await getDocs(docQuery)

                    if (!snapshot.empty) {
                        let current: Acompanhante = {
                            id: snapshot.docs[0].id,
                            nickname: snapshot.docs[0].data().nickname,
                            destaque: snapshot.docs[0].data().destaque,
                            cidade: snapshot.docs[0].data().cidade,
                            nome: snapshot.docs[0].data().nome,
                            nome_social: snapshot.docs[0].data().nome_social,
                            nascimento: snapshot.docs[0].data().nascimento,
                            whatsapp: snapshot.docs[0].data().whatsapp,
                            genero: snapshot.docs[0].data().genero,
                            genitalia: snapshot.docs[0].data().genitalia,
                            orientacao: snapshot.docs[0].data().orientacao,
                            comportamento: snapshot.docs[0].data().comportamento,
                            altura: snapshot.docs[0].data().altura,
                            peso: snapshot.docs[0].data().peso,
                            pe: snapshot.docs[0].data().pe,
                            etnia: snapshot.docs[0].data().etnia,
                            olhos: snapshot.docs[0].data().olhos,
                            estiloCabelo: snapshot.docs[0].data().estiloCabelo,
                            corCabelo: snapshot.docs[0].data().corCabelo,
                            silicone: snapshot.docs[0].data().silicone,
                            tatuagem: snapshot.docs[0].data().tatuagem,
                            piercing: snapshot.docs[0].data().piercing,
                            descricao: snapshot.docs[0].data().descricao,
                            servicos: snapshot.docs[0].data().servicos,
                            midia: snapshot.docs[0].data().midia,
                            plano: snapshot.docs[0].data().plano,
                            local: snapshot.docs[0].data().local,
                            endereco: snapshot.docs[0].data().endereco,
                            valores: snapshot.docs[0].data().valores,
                            status: snapshot.docs[0].data().status
                        }

                        resolve({
                            error: false,
                            model: current
                        })
                    } else {
                        resolve({
                            error: false,
                            model: null
                        })
                    }
                } catch (error) {
                    console.log(error)
                    resolve({
                        error: false,
                        model: null
                    })
                }
            })
        },
        verifyNickname: async (nickname: string): Promise<{ error: boolean, exists: boolean }> => {
            return new Promise(async resolve => {
                try {
                    const docQuery = query(collection(db, `acompanhantes`), where('nickname', '==', nickname))
                    const snapshot = await getDocs(docQuery)

                    if (snapshot.empty) {
                        resolve({
                            error: false,
                            exists: false
                        })
                    } else {
                        resolve({
                            error: false,
                            exists: true
                        })
                    }
                } catch (error) {
                    console.log(error)
                    resolve({
                        error: true,
                        exists: false
                    })
                }
            })
        },
        updateDestaque: async (id: string, status: boolean): Promise<{ success: boolean }> => {
            return new Promise(async resolve => {
                try {
                    const docRef = doc(db, `acompanhantes/${id}`)
                    await updateDoc(docRef, {
                        destaque: status
                    })

                    resolve({ success: true })
                } catch (error) {
                    resolve({ success: false })
                }
            })
        },
        suspend: async (id: string): Promise<{ success: boolean }> => {
            return new Promise(async resolve => {
                try {
                    const docRef = doc(db, `/acompanhantes/${id}`)
                    const snapshot = await getDoc(docRef)

                    if (snapshot.exists()) {
                        await updateDoc(docRef, {
                            status: false
                        })

                        resolve({
                            success: true
                        })
                    }
                } catch (error) {
                    resolve({
                        success: false
                    })
                }
            })
        },
        active: async (id: string): Promise<{ success: boolean }> => {
            return new Promise(async resolve => {
                try {
                    const docRef = doc(db, `/acompanhantes/${id}`)
                    const snapshot = await getDoc(docRef)

                    if (snapshot.exists()) {
                        await updateDoc(docRef, {
                            status: true
                        })

                        resolve({
                            success: true
                        })
                    }
                } catch (error) {
                    resolve({
                        success: false
                    })
                }
            })
        },
        delete: async (id: string): Promise<{ success: boolean }> => {
            return new Promise(async resolve => {
                try {
                    const docRef = doc(db, `/acompanhantes/${id}`)
                    const snapshot = await getDoc(docRef)

                    if (snapshot.exists()) {
                        await deleteDoc(docRef)

                        resolve({
                            success: true
                        })
                    }
                } catch (error) {
                    resolve({
                        success: false
                    })
                }
            })
        },
    },
    mail: {
        register: async (mail: Mail): Promise<{ error: boolean }> => {
            return new Promise(async resolve => {
                try {
                    await addDoc(collection(db, 'mailbox'), {
                        name: mail.name,
                        email: mail.email,
                        phone: mail.phone,
                        message: mail.message,
                        subject: mail.subject,
                        status: mail.status
                    })

                    resolve({ error: false })
                } catch (error) {
                    resolve({ error: true })
                }
            })
        },
        setRead: async (id: string): Promise<{ error: boolean }> => {
            return new Promise(async resolve => {
                try {
                    const docRef = doc(db, `mailbox/${id}`)
                    const snapshot = await getDoc(docRef)

                    if (snapshot.exists()) {
                        let current: { read: boolean, received: Date } = snapshot.data().status


                        await updateDoc(docRef, {
                            status: {
                                read: true,
                                received: current.received
                            }
                        })
                    } else {
                        resolve({ error: true })
                    }

                    resolve({ error: false })
                } catch (error) {
                    resolve({ error: true })
                }
            })
        },
        get: async (): Promise<{ error: boolean, mails: Mail[] }> => {
            return new Promise(async resolve => {
                try {
                    const busca = query(collection(db, 'mailbox'))
                    const snapshot = await getDocs(busca)
                    const result: Mail[] = []

                    if (snapshot.empty) {
                        resolve({
                            error: false,
                            mails: []
                        })
                    } else {
                        snapshot.forEach(item => {
                            let current: Mail = {
                                id: item.id,
                                name: item.data().name,
                                email: item.data().email,
                                phone: item.data().phone,
                                message: item.data().message,
                                subject: item.data().subject,
                                status: {
                                    read: item.data().status.read,
                                    received: new Date(item.data().status.received)
                                }
                            }

                            result.push(current)
                        })

                        resolve({
                            error: false,
                            mails: result
                        })
                    }
                } catch (error) {
                    resolve({ error: true, mails: [] })
                }
            })
        },
    },
    post: {
        insert: async (post: Post): Promise<{ success: boolean, id: string | null }> => {
            return new Promise(async resolve => {
                try {
                    const set = await addDoc(collection(db, "posts"), {
                        title: post.title,
                        description: post.description,
                        content: post.content,
                        image: post.image,
                        autor: post.autor,
                        created: post.created,
                        focus: post.focus,
                        linkname: post.linkname
                    })

                    resolve({
                        success: true,
                        id: set.id
                    })
                } catch (error) {
                    console.log(error)
                    resolve({
                        success: false,
                        id: null
                    })
                }
            })
        },
        update: async (post: Post): Promise<{ success: boolean }> => {
            return new Promise(async resolve => {
                try {
                    const docRef = doc(db, `posts/${post.id}`)
                    await updateDoc(docRef, {
                        title: post.title,
                        description: post.description,
                        content: post.content,
                        image: post.image,
                        autor: post.autor,
                        created: post.created,
                        focus: post.focus,
                        linkname: post.linkname
                    })

                    resolve({
                        success: true
                    })
                } catch (error) {
                    console.log(error)
                    resolve({
                        success: false
                    })
                }
            })
        },
        get: async (): Promise<{ success: boolean, data: Post[] }> => {
            return new Promise(async resolve => {
                try {
                    const docQuery = query(collection(db, 'posts'))
                    const snapshot = await getDocs(docQuery)
                    const result: Post[] = []

                    if (snapshot.empty) {
                        resolve({
                            success: true,
                            data: []
                        })
                    } else {
                        snapshot.forEach((post) => {
                            let current: Post = {
                                id: post.id,
                                title: post.data().title,
                                description: post.data().description,
                                content: post.data().content,
                                image: post.data().image,
                                autor: post.data().autor,
                                created: post.data().created,
                                focus: post.data().focus,
                                linkname: post.data().linkname
                            }

                            result.push(current)
                        })

                        resolve({
                            success: true,
                            data: result
                        })
                    }

                } catch (error) {
                    resolve({
                        success: false,
                        data: []
                    })
                }
            })
        },
        getLasteds: async (): Promise<{ success: boolean, data: Post[] }> => {
            return new Promise(async resolve => {
                try {
                    const docQuery = query(collection(db, 'posts'), orderBy('created', 'desc'), limit(3))
                    const snapshot = await getDocs(docQuery)
                    const result: Post[] = []

                    if (snapshot.empty) {
                        resolve({
                            success: true,
                            data: []
                        })
                    } else {
                        snapshot.forEach((post) => {
                            let current: Post = {
                                id: post.id,
                                title: post.data().title,
                                description: post.data().description,
                                content: post.data().content,
                                image: post.data().image,
                                autor: post.data().autor,
                                created: post.data().created,
                                focus: post.data().focus,
                                linkname: post.data().linkname
                            }

                            result.push(current)
                        })

                        resolve({
                            success: true,
                            data: result
                        })
                    }

                } catch (error) {
                    resolve({
                        success: false,
                        data: []
                    })
                }
            })
        },
        getById: async (id: string): Promise<{ success: boolean, post: Post | null }> => {
            return new Promise(async resolve => {
                try {
                    const docRef = doc(db, `/posts/${id}`)
                    const snapshot = await getDoc(docRef)

                    if (snapshot.exists()) {
                        let current: Post = {
                            id: snapshot.id,
                            title: snapshot.data().title,
                            description: snapshot.data().description,
                            content: snapshot.data().content,
                            image: snapshot.data().image,
                            autor: snapshot.data().autor,
                            created: snapshot.data().created,
                            focus: snapshot.data().focus,
                            linkname: snapshot.data().linkname,
                        }

                        resolve({
                            success: true,
                            post: current
                        })
                    } else {
                        resolve({
                            success: true,
                            post: null
                        })
                    }
                } catch (error) {
                    resolve({
                        success: false,
                        post: null
                    })
                }
            })
        },
        getByLinkname: async (linkname: string): Promise<{ success: boolean, post: Post | null }> => {
            return new Promise(async resolve => {
                try {
                    const docQuery = query(collection(db, `/posts`), where('linkname', '==', linkname))
                    const snapshot = await getDocs(docQuery)

                    if (!snapshot.empty) {
                        let current: Post = {
                            id: snapshot.docs[0].id,
                            title: snapshot.docs[0].data().title,
                            description: snapshot.docs[0].data().description,
                            content: snapshot.docs[0].data().content,
                            image: snapshot.docs[0].data().image,
                            autor: snapshot.docs[0].data().autor,
                            created: snapshot.docs[0].data().created,
                            focus: snapshot.docs[0].data().focus,
                            linkname: snapshot.docs[0].data().linkname,
                        }

                        resolve({
                            success: true,
                            post: current
                        })
                    } else {
                        resolve({
                            success: true,
                            post: null
                        })
                    }
                } catch (error) {
                    resolve({
                        success: false,
                        post: null
                    })
                }
            })
        },
        uploadImage: async (file: File, id: string): Promise<{ success: boolean, url: string | null }> => {
            return new Promise(resolve => {
                try {
                    const storage = getStorage();

                    setTimeout(async () => {
                        const fileRef = ref(storage, `post/${id}/${file.name}`);
                        const snapshot = await uploadBytes(fileRef, file);
                        const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath));

                        const docRef = doc(db, `/posts/${id}`)
                        await updateDoc(docRef, {
                            image: url
                        })

                        resolve({
                            success: true,
                            url: url
                        })
                    })

                } catch (error) {
                    resolve({
                        success: false,
                        url: null
                    })
                }
            })
        },
        setFocus: async (id: string): Promise<{ success: boolean }> => {
            return new Promise(async resolve => {
                try {
                    const docQuery = query(collection(db, '/posts/'), where('focus', '==', true))
                    const snapshot = await getDocs(docQuery)

                    if (!snapshot.empty) {
                        snapshot.forEach(async (item) => {
                            let currentDoc = doc(db, `/posts/${item.id}`)

                            await updateDoc(currentDoc, {
                                focus: false
                            })
                        })
                    }

                    const docRef = doc(db, `/posts/${id}`)
                    await updateDoc(docRef, {
                        focus: true
                    })

                    resolve({
                        success: true
                    })
                } catch (error) {
                    resolve({
                        success: false
                    })
                }
            })
        }
    },
    functions: {
        timestampToDate: (timestamp: any): string => {
            const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
            return new Date(milliseconds).toLocaleDateString();
        },
        formatTextForLink: (text: string): string => {
            return text
                .toLowerCase()
                .normalize('NFD') // Normaliza para decompor caracteres acentuados
                .replace(/[\u0300-\u036f]/g, '') // Remove as marcas de acentuação
                .replace(/ç/g, 'c') // Substitui 'ç' por 'c'
                .replace(/\s+/g, '-') // Substitui espaços por hífens
                .replace(/[^a-z0-9\-]/g, ''); // Remove caracteres especiais
        },
        generateRandomHash: (length: number = 10): string => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }
            return result;
        }
    },
    sendNotification: async (email: string, usuario: string, mensagem: string, contato: string): Promise<{ error: boolean }> => {
        return new Promise(async resolve => {
            try {
                const docRef = await addDoc(collection(db, "mail"), {
                    message: {
                        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="format-detection" content="telephone=no"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Link para Suporte Psicológico</title> <style type="text/css" emogrify="no"> #outlook a { padding: 0; } .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } table td { border-collapse: collapse; mso-line-height-rule: exactly; } .editable.image { font-size: 0 !important; line-height: 0 !important; } .nl2go_preheader { display: none !important; mso-hide: all !important; mso-line-height-rule: exactly; visibility: hidden !important; line-height: 0px !important; font-size: 0px !important; } body { width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0; } img { outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } a img { border: none; } table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } th { font-weight: normal; text-align: left; } *[class="gmail-fix"] { display: none !important; } </style> <style type="text/css" emogrify="no"> @media (max-width: 600px) { .gmx-killpill { content: ' D1'; } } </style> <style type="text/css" emogrify="no"> @media (max-width: 600px) { .gmx-killpill { content: ' D1'; } .r0-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 320px !important } .r1-i { background-color: #ffffff !important } .r2-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 100% !important } .r3-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 100% !important } .r4-i { padding-bottom: 20px !important; padding-left: 0px !important; padding-right: 0px !important; padding-top: 20px !important } .r5-c { box-sizing: border-box !important; display: block !important; valign: top !important; width: 100% !important } .r6-o { border-style: solid !important; width: 100% !important } .r7-i { padding-left: 0px !important; padding-right: 0px !important } .r8-c { box-sizing: border-box !important; text-align: left !important; valign: top !important; width: 100% !important } .r9-o { border-style: solid !important; margin: 0 auto 0 0 !important; width: 100% !important } .r10-i { padding-top: 15px !important; text-align: center !important } .r11-i { padding-top: 15px !important; text-align: left !important } .r12-i { padding-bottom: 15px !important; padding-top: 15px !important; text-align: left !important } .r13-c { box-sizing: border-box !important; padding: 0 !important; text-align: center !important; valign: top !important; width: 100% !important } .r14-o { border-style: solid !important; margin: 0 auto 0 auto !important; margin-bottom: 15px !important; margin-top: 15px !important; width: 100% !important } .r15-i { padding: 0 !important; text-align: center !important } .r16-r { background-color: #1B1B1B !important; border-radius: 4px !important; border-width: 0px !important; box-sizing: border-box; height: initial !important; padding: 0 !important; padding-bottom: 12px !important; padding-left: 5px !important; padding-right: 5px !important; padding-top: 12px !important; text-align: center !important; width: 100% !important } .r17-i { background-color: #eff2f7 !important; padding-bottom: 20px !important; padding-left: 15px !important; padding-right: 15px !important; padding-top: 20px !important } .r18-i { padding-bottom: 0px !important; padding-top: 15px !important; text-align: center !important } .r19-i { padding-bottom: 0px !important; padding-top: 0px !important; text-align: center !important } .r20-i { padding-bottom: 15px !important; padding-top: 15px !important; text-align: center !important } .r21-c { box-sizing: border-box !important; text-align: center !important; width: 100% !important } .r22-i { padding-bottom: 15px !important; padding-left: 0px !important; padding-right: 0px !important; padding-top: 0px !important } .r23-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 129px !important } .r24-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 129px !important } body { -webkit-text-size-adjust: none } .nl2go-responsive-hide { display: none } .nl2go-body-table { min-width: unset !important } .mobshow { height: auto !important; overflow: visible !important; max-height: unset !important; visibility: visible !important; border: none !important } .resp-table { display: inline-table !important } .magic-resp { display: table-cell !important } } </style> <style type="text/css"> p, h1, h2, h3, h4, ol, ul { margin: 0; } a, a:link { color: #696969; text-decoration: underline } .nl2go-default-textstyle { color: #3b3f44; font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word } .default-button { color: #ffffff; font-family: arial, helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: normal; line-height: 1.15; text-decoration: none; word-break: break-word } .default-heading1 { color: #1F2D3D; font-family: arial, helvetica, sans-serif; font-size: 36px; word-break: break-word } .default-heading2 { color: #1F2D3D; font-family: arial, helvetica, sans-serif; font-size: 32px; word-break: break-word } .default-heading3 { color: #1F2D3D; font-family: arial, helvetica, sans-serif; font-size: 24px; word-break: break-word } .default-heading4 { color: #1F2D3D; font-family: arial, helvetica, sans-serif; font-size: 18px; word-break: break-word } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .no-show-for-you { border: none; display: none; float: none; font-size: 0; height: 0; line-height: 0; max-height: 0; mso-hide: all; overflow: hidden; table-layout: fixed; visibility: hidden; width: 0; } </style> <!--[if mso]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--> <style type="text/css"> a:link { color: #696969; text-decoration: underline; } </style> </head> <body bgcolor="#ffffff" text="#3b3f44" link="#696969" yahoo="fix" style="background-color: #ffffff;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" class="nl2go-body-table" width="100%" style="background-color: #ffffff; width: 100%;"> <tr> <td> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" align="center" class="r0-o" style="table-layout: fixed; width: 600px;"> <tr> <td valign="top" class="r1-i" style="background-color: #ffffff;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r3-o" style="table-layout: fixed; width: 100%;"> <tr> <td class="r4-i" style="padding-bottom: 20px; padding-top: 20px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"> <tr> <th width="100%" valign="top" class="r5-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"> <tr> <td valign="top" class="r7-i" style="padding-left: 15px; padding-right: 15px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"> <tr> <td class="r8-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r9-o" style="table-layout: fixed; width: 100%;"> <tr> <td align="center" valign="top" class="r10-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-top: 15px; text-align: center;"> <div> <h1 class="default-heading1" style="margin: 0; color: #1f2d3d; font-family: arial,helvetica,sans-serif; font-size: 36px; word-break: break-word;"> Foxy Lady</h1> </div> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </th> </tr> </table> </td> </tr> </table> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r3-o" style="table-layout: fixed; width: 100%;"> <tr> <td class="r4-i" style="padding-bottom: 20px; padding-top: 20px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"> <tr> <th width="100%" valign="top" class="r5-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"> <tr> <td valign="top" class="r7-i" style="padding-left: 10px; padding-right: 10px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"> <tr> <td class="r8-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r9-o" style="table-layout: fixed; width: 100%;"> <tr> <td align="left" valign="top" class="r11-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-top: 15px; text-align: left;"> <div> <h2 class="default-heading2" style="margin: 0; color: #1f2d3d; font-family: arial,helvetica,sans-serif; font-size: 32px; word-break: break-word;"> Foxy Lady - Plataforma de Acompanhantes</h2> </div> </td> </tr> </table> </td> </tr> <tr> <td class="r8-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r9-o" style="table-layout: fixed; width: 100%;"> <tr> <td align="left" valign="top" class="r12-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: left;"> <div> <p style="margin: 0;"> </p> <p style="margin: 0;">Você recebeu uma nova mensagem do site oficial.". <br><br><strong>Nome:</strong> ${usuario}<br><strong>E-mail:</strong> ${email}<br><strong>Assunto:</strong> ${contato}<br><strong>Descrição:</strong> ${mensagem} </p> </div> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </th> </tr> </table> </td> </tr> </table> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r3-o" style="table-layout: fixed; width: 100%;"> <tr> <td class="r17-i" style="background-color: #eff2f7; padding-bottom: 20px; padding-top: 20px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"> <tr> <th width="100%" valign="top" class="r5-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"> </table> </th> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body> </html>`,
                        subject: 'Foxy Lady - Nova mensagem recebida',
                        text: 'Você recebeu uma nova mensagem da plataforma Foxy Lady'
                    },
                    to: 'contato@foxylady.com.br'
                });

                resolve({
                    error: false
                })
            } catch (error) {
                resolve({
                    error: true
                })
            }
        })
    },
}