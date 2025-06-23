'use client'
import { useState, useEffect, FormEvent, SetStateAction, Dispatch } from "react";
import { Backdrop, CircularProgress, MenuItem, TextField } from "@mui/material"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import { Acompanhante } from "@/types/Acompanhante";
import { stringToDate } from "@/services/functions";
import { api } from "@/services/api";
import Price from "./Price";
import Whammy from 'whammy';
import imageCompression from 'browser-image-compression';

import Editor from "./Editor";

type Props = {
    visible: boolean,
    fn: Dispatch<SetStateAction<"search" | "insert" | "edit" | "gallery">>
}

const InserirAcompanhante = ({ visible, fn }: Props) => {
    //Variaveis
    const [formScreen, setFormScreen] = useState<'dados' | 'servicos' | 'midia'>('dados')
    const [perfilFile, setPerfilFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [cardFile, setCardFile] = useState<File | null>(null);
    const [comparacaoFile, setComparacaoFile] = useState<File | null>(null);
    const [perfilUrl, setPerfilUrl] = useState<string | null>(null);
    const [bannerUrl, setBannerUrl] = useState<string | null>(null);
    const [cardUrl, setCardUrl] = useState<string | null>(null);
    const [comparacaoUrl, setComparacaoUrl] = useState<string | null>(null);
    const [preview, setPreview] = useState<'perfil' | 'banner' | 'card' | 'comparacao'>('perfil')
    const [previewFloat, setPreviewFloat] = useState(false)
    const [submitLoader, setSubmitLoader] = useState(false)
    const [loadingText, setLoadingText] = useState('Registrando acompanhante, por favor, aguarde....')
    const [quinzeMin, setQuinzeMin] = useState(0)
    const [trintaMin, setTrintaMin] = useState(0)
    const [umaHora, setUmaHora] = useState(0)
    const [duasHoras, setDuasHoras] = useState(0)
    const [quatroHoras, setQuatroHoras] = useState(0)
    const [diaria, setDiaria] = useState(0)
    const [pernoite, setPernoite] = useState(0)
    const [diariaViagem, setDiariaViagem] = useState(0)
    const [available, setAvailable] = useState<boolean>()

    // Handlers

    const handleChangePerfil = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setPerfilFile(file);

        if (file) {
            const url = URL.createObjectURL(file);
            setPerfilUrl(url);
        }
    };

    const handleClickPerfil = () => {
        const input = document.getElementById('hidden-input-perfil');
        if (input) {
            input.click();
        }
    };

    const handleChangeBanner = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setBannerFile(file);

        if (file) {
            const url = URL.createObjectURL(file);
            setBannerUrl(url);
        }
    };

    const handleClickBanner = () => {
        const input = document.getElementById('hidden-input-banner');
        if (input) {
            input.click();
        }
    };

    const handleChangeCard = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setCardFile(file);

        if (file) {
            const url = URL.createObjectURL(file);
            setCardUrl(url);
        }
    };

    const handleClickCard = () => {
        const input = document.getElementById('hidden-input-card');
        if (input) {
            input.click();
        }
    };

    const handleChangeComparacao = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setComparacaoFile(file);

        if (file) {
            const url = URL.createObjectURL(file);
            setComparacaoUrl(url);
        }
    };

    const handleClickComparacao = () => {
        const input = document.getElementById('hidden-input-comparacao');
        if (input) {
            input.click();
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setSubmitLoader(true)
        const form = new FormData(event.currentTarget)
        const birthday = stringToDate(form.get('birthday') as string)

        if (perfilFile && bannerFile && cardFile && comparacaoFile && available) {
            let acompanhante: Acompanhante = {
                id: "",
                nickname: form.get('nickname') as string,
                destaque: false,
                cidade: form.get('cidade') as string,
                nome: form.get('name') as string,
                nome_social: form.get('social-name') as string,
                nascimento: birthday,
                whatsapp: form.get('whatsapp') as string,
                genero: form.get('gender') as string,
                genitalia: form.get('genitalia') as string,
                orientacao: form.get('sexual-orientation') as string,
                comportamento: form.get('comportamento') as string,
                altura: form.get('height') as string,
                peso: form.get('weight') as string,
                pe: form.get('foot-height') as string,
                etnia: form.get('etinia') as string,
                olhos: form.get('eye-color') as string,
                estiloCabelo: form.get('type-hair') as string,
                corCabelo: form.get('hair-color') as string,
                silicone: form.get('silicone') as string,
                tatuagem: form.get('tatoo') as string,
                piercing: form.get('piercing') as string,
                descricao: form.get('descricao') as string,
                servicos: {
                    beijo_grego: form.get('beijo_grego') == 'on' ? true : false,
                    beijo_na_boca: form.get('beijo_na_boca') == 'on' ? true : false,
                    bondage: form.get('bondage') == 'on' ? true : false,
                    chuva_dourada: form.get('chuva_dourada') == 'on' ? true : false,
                    chuva_marrom: form.get('chuva_marrom') == 'on' ? true : false,
                    dominacao: form.get('dominacao') == 'on' ? true : false,
                    dupla_penetracao: form.get('dupla_penetracao') == 'on' ? true : false,
                    facefuck: form.get('facefuck') == 'on' ? true : false,
                    fisting: form.get('fisting') == 'on' ? true : false,
                    masturbacao: form.get('masturbacao') == 'on' ? true : false,
                    massagem_tantrica: form.get('massagem_tantrica') == 'on' ? true : false,
                    massagem_tradicional: form.get('massagem_tradicional') == 'on' ? true : false,
                    oral_sem_preservativo: form.get('oral_sem_preservativo') == 'on' ? true : false,
                    penetração_com_acessorios: form.get('penetração_com_acessorios') == 'on' ? true : false,
                    permite_filmagem: form.get('permite_filmagem') == 'on' ? true : false,
                    podolatria: form.get('podolatria') == 'on' ? true : false,
                    quirofilia: form.get('quirofilia') == 'on' ? true : false,
                    roleplay: form.get('roleplay') == 'on' ? true : false,
                    sadomasoquismo: form.get('sadomasoquismo') == 'on' ? true : false,
                    sexo_anal_com_preservativo: form.get('sexo_anal_com_preservativo') == 'on' ? true : false,
                    sexo_com_voyeurismo: form.get('sexo_com_voyeurismo') == 'on' ? true : false,
                    sexo_oral_com_preservativo: form.get('sexo_oral_com_preservativo') == 'on' ? true : false,
                    sexo_vaginal_com_preservativo: form.get('sexo_vaginal_com_preservativo') == 'on' ? true : false,
                    sexo_virtual: form.get('sexo_virtual') == 'on' ? true : false,
                    squirt: form.get('squirt') == 'on' ? true : false,
                    striptease: form.get('striptease') == 'on' ? true : false,
                    trampling: form.get('trampling') == 'on' ? true : false,
                    tripla_penetracao: form.get('tripla_penetracao') == 'on' ? true : false,
                    uso_de_fantasias: form.get('uso_de_fantasias') == 'on' ? true : false
                },
                midia: {
                    facebook: form.get('facebook') as string,
                    instagram: form.get('instagram') as string,
                    tiktok: form.get('tiktok') as string,
                    onlyfans: form.get('onlyfans') as string,
                    privacy: form.get('privacy') as string,
                    perfil: "",
                    banner: "",
                    card: "",
                    comparacao: ""
                },
                plano: form.get('plano') as 'Bronze' | 'Prata' | 'Ouro',
                local: form.get('local') as string,
                endereco: form.get('location') as string,
                valores: {
                    quinze_min: quinzeMin,
                    meia_hora: trintaMin,
                    uma_hora: umaHora,
                    duas_horas: duasHoras,
                    quatro_horas: quatroHoras,
                    diaria: diaria,
                    pernoite: pernoite,
                    diaria_viagem: diariaViagem
                },
                status: true
            }

            const insert = await api.acompanhante.insert(acompanhante)

            if (insert.error) {
                alert('Houve um erro ao registrar')
                setSubmitLoader(false)
            } else if (insert.id) {
                setLoadingText('Fazendo upload das mídias...')
                let links: string[] = []

                for (const file of [perfilFile, bannerFile, cardFile, comparacaoFile]) {
                    const uploadMidia = await api.acompanhante.uploadMidia(file, insert.id)

                    if (uploadMidia.error) {
                        alert('Houve um erro ao registrar os arquivos de mídia')
                        setSubmitLoader(false)
                    } else if (uploadMidia.url) {
                        links.push(uploadMidia.url)
                    }
                }

                if (links.length == 4) {
                    setLoadingText('Registrando mídias...')

                    const update = await api.acompanhante.updateMidiaAfterRegister(insert.id, links[0], links[1], links[2], links[3])

                    if (update.success) {
                        setLoadingText('Cadastro realizado!')

                        setTimeout(() => {
                            location.reload()
                        }, 2000)
                    }
                } else {
                    alert('Houve um erro ao registrar os arquivos de mídia')
                    setSubmitLoader(false)
                }

            }
        }
    }

    const handleCheckNickname = async (nickname: string) => {
        const verify = await api.acompanhante.verifyNickname(nickname)

        if (verify.error) {

        } else if (verify.exists) {
            console.log('ja existe')
            setAvailable(false)
        } else {
            console.log('nao existe')
            setAvailable(true)
        }
    }



    return (
        <div className='flex flex-col items-center w-full flex-1 relative' style={{ display: visible ? 'flex' : 'none' }}>
            <Backdrop open={submitLoader} sx={{ zIndex: 999, display: 'flex', flexDirection: 'column', gap: 5 }}>
                <CircularProgress />
                <p className='text-white'>{loadingText}</p>
            </Backdrop>
            <h1 className='text-3xl font-semibold text-center my-12'>Cadastro de Acompanhante</h1>
            <form className="flex flex-col w-full md:w-[70%] mb-12" onSubmit={
                e => {
                    e.preventDefault()
                    handleSubmit(e)
                }
            }>
                <div className='flex-col gap-5 w-full' style={{ display: formScreen == 'dados' ? 'flex' : 'none' }}>
                    <span className='font-extralight text-sm'>Plano</span>
                    <TextField
                        required
                        label='Plano'
                        name='plano'
                        size='small'
                        sx={{ flex: 1 }}
                        select
                    >
                        <MenuItem value='Bronze'>Bronze</MenuItem>
                        <MenuItem value='Prata'>Prata</MenuItem>
                        <MenuItem value='Ouro'>Ouro</MenuItem>
                    </TextField>
                    <span className='font-extralight text-sm'>Cidade</span>
                    <TextField
                        required
                        label='Cidade'
                        name='cidade'
                        size='small'
                        sx={{ flex: 1 }}
                        select
                    >
                        <MenuItem value='Campinas - SP'>Campinas - SP</MenuItem>
                        <MenuItem value='Sorocaba - SP'>Sorocaba - SP</MenuItem>
                        <MenuItem value='Londrina - PR'>Londrina - PR</MenuItem>
                    </TextField>
                    <span className='font-extralight text-sm'>Informações pessoais</span>
                    <fieldset className="flex flex-col md:flex-row gap-3">
                        <TextField
                            required
                            label='Nome'
                            name='name'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            required
                            label='Nome de exibição'
                            name='social-name'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            required
                            label='Nickname (Link da página)'
                            name='nickname'
                            size='small'
                            sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: available ? '#22c55e' : available === false ? '#ef4444' : '',
                                },
                            }}
                            onBlur={(e) => { handleCheckNickname(e.target.value) }}
                        />
                    </fieldset>
                    <fieldset className="flex flex-col md:flex-row gap-3">
                        <TextField
                            required
                            label='Data de Nascimento'
                            type='date'
                            name='birthday'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            required
                            label='Whatsapp'
                            name='whatsapp'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            required
                            label='Gênero'
                            name='gender'
                            size='small'
                            sx={{ flex: 1 }}
                            select
                        >
                            <MenuItem value='Homem'>Homem</MenuItem>
                            <MenuItem value='Mulher'>Mulher</MenuItem>
                            <MenuItem value='Homem Transgênero'>Homem Transgênero</MenuItem>
                            <MenuItem value='Mulher Transgênero'>Mulher Transgênero</MenuItem>
                            <MenuItem value='Não Binário'>Não Binário</MenuItem>
                        </TextField>
                        <TextField
                            required
                            label='Genitália'
                            name='genitalia'
                            size='small'
                            sx={{ flex: 1 }}
                            select
                        >
                            <MenuItem value='Possui pênis'>Possui pênis</MenuItem>
                            <MenuItem value='Possui vagina'>Possui vagina</MenuItem>
                        </TextField>
                    </fieldset>
                    <fieldset className="flex flex-col md:flex-row gap-3">
                        <TextField
                            required
                            label='Orientação Sexual'
                            name='sexual-orientation'
                            size='small'
                            sx={{ flex: 0.5 }}
                            select
                        >
                            <MenuItem value='Heterossexual'>Heterossexual</MenuItem>
                            <MenuItem value='Homossexual'>Homossexual</MenuItem>
                            <MenuItem value='Bissexual'>Bissexual</MenuItem>
                        </TextField>
                        <TextField
                            required
                            label='Comportamento Sexual'
                            name='comportamento'
                            size='small'
                            sx={{ flex: 1 }}
                            select
                        >
                            <MenuItem value='Ativo'>Ativo</MenuItem>
                            <MenuItem value='Passivo'>Passivo</MenuItem>
                            <MenuItem value='Ativo e Passivo'>Ativo e Passivo</MenuItem>
                        </TextField>
                    </fieldset>
                    <span className='font-extralight text-sm'>Características pessoais</span>
                    <fieldset className="flex flex-col md:flex-row gap-3">
                        <TextField
                            required
                            label='Altura'
                            name='height'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            required
                            label='Peso'
                            name='weight'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            required
                            label='Tamanho do pé'
                            name='foot-height'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                    </fieldset>
                    <fieldset className="flex flex-col md:flex-row gap-3">
                        <TextField
                            required
                            label='Etnia'
                            name='etinia'
                            size='small'
                            sx={{ flex: 1 }}
                            select
                        >
                            <MenuItem value='Branco'>Branco</MenuItem>
                            <MenuItem value='Preto'>Preto</MenuItem>
                            <MenuItem value='Pardo'>Pardo</MenuItem>
                            <MenuItem value='Asiático'>Asiático</MenuItem>
                            <MenuItem value='Indígena'>Indígena</MenuItem>
                        </TextField>
                        <TextField
                            required
                            label='Cor dos olhos'
                            name='eye-color'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                    </fieldset>
                    <fieldset className="flex flex-col md:flex-row gap-3">
                        <TextField
                            required
                            label='Estilo do cabelo'
                            name='type-hair'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            required
                            label='Cor do cabelo'
                            name='hair-color'
                            size='small'
                            sx={{ flex: 1 }}
                        />

                    </fieldset>
                    <fieldset className="flex flex-col md:flex-row gap-3">
                        <TextField
                            required
                            label='Silicone'
                            name='silicone'
                            size='small'
                            sx={{ flex: 1 }}
                            select
                        >
                            <MenuItem value='Sim'>Sim</MenuItem>
                            <MenuItem value='Não'>Não</MenuItem>
                        </TextField>
                        <TextField
                            required
                            label='Tatuagens'
                            name='tatoo'
                            size='small'
                            sx={{ flex: 1 }}
                            select
                        >
                            <MenuItem value='Sim'>Sim</MenuItem>
                            <MenuItem value='Não'>Não</MenuItem>
                        </TextField>
                        <TextField
                            required
                            label='Piercing'
                            name='piercing'
                            size='small'
                            sx={{ flex: 1 }}
                            select
                        >
                            <MenuItem value='Sim'>Sim</MenuItem>
                            <MenuItem value='Não'>Não</MenuItem>
                        </TextField>
                    </fieldset>
                    <fieldset className="flex flex-col md:flex-row gap-3">
                        <Editor type="Editor" />
                    </fieldset>
                    <span className='font-extralight text-sm'>Localização e Valores</span>
                    <fieldset className="flex flex-col md:flex-row gap-3">
                        <TextField
                            required
                            label='Local'
                            name='local'
                            size='small'
                            sx={{ flex: 1 }}
                            select
                        >
                            <MenuItem value='Local Particular'>Local Particular</MenuItem>
                            <MenuItem value='Local à escolha do cliente'>Local à escolha do cliente</MenuItem>
                            <MenuItem value='Local à escolha do cliente'>Ambos</MenuItem>
                        </TextField>
                        <TextField
                            required
                            label='Localização'
                            name='location'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                    </fieldset>
                    <fieldset className="grid lg:grid-cols-2 gap-3">
                        <Price
                            edit={true}
                            fn={setQuinzeMin}
                            label={'15 minutos'}
                            name={'valor-despesa'}
                            muiStyle
                            value={0}
                        />
                        <Price
                            edit={true}
                            fn={setTrintaMin}
                            label={'30 minutos'}
                            name={'valor-despesa'}
                            muiStyle
                            value={0}
                        />
                        <Price
                            edit={true}
                            fn={setUmaHora}
                            label={'1 hora'}
                            name={'valor-despesa'}
                            muiStyle
                            value={0}
                        />
                        <Price
                            edit={true}
                            fn={setDuasHoras}
                            label={'2 horas'}
                            name={'valor-despesa'}
                            muiStyle
                            value={0}
                        />
                        <Price
                            edit={true}
                            fn={setQuatroHoras}
                            label={'4 horas'}
                            name={'valor-despesa'}
                            muiStyle
                            value={0}
                        />
                        <Price
                            edit={true}
                            fn={setDiaria}
                            label={'Diária'}
                            name={'valor-despesa'}
                            muiStyle
                            value={0}
                        />
                        <Price
                            edit={true}
                            fn={setPernoite}
                            label={'Pernoite'}
                            name={'valor-despesa'}
                            muiStyle
                            value={0}
                        />
                        <Price
                            edit={true}
                            fn={setDiariaViagem}
                            label={'Diária de Viagem'}
                            name={'valor-despesa'}
                            muiStyle
                            value={0}
                        />
                    </fieldset>
                    <span className='text-sm font-extralight ttext-center'>Caso não realize o serviço o valor deverá estar zerado</span>
                    <hr />
                    <span className="flex justify-between">
                        <button className="px-5 py-2 border rounded-md hover:shadow-sm text-red-500">Cancelar</button>
                        <div className='flex gap-3'>
                            <button className="px-5 py-2 border rounded-md hover:shadow-sm text-white bg-primary" type="button" onClick={() => {
                                setFormScreen('servicos')
                            }}>Ir para Serviços</button>
                        </div>
                    </span>
                </div>
                <div className='flex flex-col gap-5 w-full' style={{ display: formScreen == 'servicos' ? 'flex' : 'none' }}>
                    <span className='font-extralight text-sm'>Serviços</span>
                    <fieldset className=' w-full'>
                        <FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', fontSize: '12px', width: '100%' }}>
                            <FormControlLabel control={<Checkbox name="acessorios_eroticos" />} label="Acessórios eróticos" sx={{ width: '100%' }} />
                            <FormControlLabel control={<Checkbox name="beijo_grego" />} label="Beijo grego" />
                            <FormControlLabel control={<Checkbox name="beijo_na_boca" />} label="Beijo na boca" />
                            <FormControlLabel control={<Checkbox name="bondage" />} label="Bondage" />
                            <FormControlLabel control={<Checkbox name="chuva_dourada" />} label="Chuva dourada" />
                            <FormControlLabel control={<Checkbox name="chuva_marrom" />} label="Chuva marrom" />
                            <FormControlLabel control={<Checkbox name="dominação" />} label="Dominação" />
                            <FormControlLabel control={<Checkbox name="dupla_penetracao" />} label="Dupla penetração" />
                            <FormControlLabel control={<Checkbox name="facefuck" />} label="Facefuck" />
                            <FormControlLabel control={<Checkbox name="fisting" />} label="Fisting" />
                            <FormControlLabel control={<Checkbox name="masturbacao" />} label="Masturbação" />
                            <FormControlLabel control={<Checkbox name="massagem_tantrica" />} label="Massagem tântrica" />
                            <FormControlLabel control={<Checkbox name="massagem_tradicional" />} label="Massagem tradicional" />
                            <FormControlLabel control={<Checkbox name="oral_sem_preservativo" />} label="Oral sem preservativo" />
                            <FormControlLabel control={<Checkbox name="penetração_com_acessorios" />} label="Penetração com uso de acessórios sexuais" />
                            <FormControlLabel control={<Checkbox name="permite_filmagem" />} label="Permite filmagem" />
                            <FormControlLabel control={<Checkbox name="podolatria" />} label="Podolatria" />
                            <FormControlLabel control={<Checkbox name="quirofilia" />} label="Quirofilia" />
                            <FormControlLabel control={<Checkbox name="roleplay" />} label="Roleplay" />
                            <FormControlLabel control={<Checkbox name="sadomasoquismo" />} label="Sadomasoquismo" />
                            <FormControlLabel control={<Checkbox name="sexo_anal_com_preservativo" />} label="Sexo anal com preservativo" />
                            <FormControlLabel control={<Checkbox name="sexo_com_voyeurismo" />} label="Sexo com voyeurismo / ser voyeur" />
                            <FormControlLabel control={<Checkbox name="sexo_oral_com_preservativo" />} label="Sexo oral com preservativo" />
                            <FormControlLabel control={<Checkbox name="sexo_vaginal_com_preservativo" />} label="Sexo vaginal com preservativo" />
                            <FormControlLabel control={<Checkbox name="sexo_virtual" />} label="Sexo virtual" />
                            <FormControlLabel control={<Checkbox name="squirt" />} label="Squirt" />
                            <FormControlLabel control={<Checkbox name="striptease" />} label="Striptease" />
                            <FormControlLabel control={<Checkbox name="trampling" />} label="Trampling" />
                            <FormControlLabel control={<Checkbox name="tripla_penetracao" />} label="Tripla penetração" />
                            <FormControlLabel control={<Checkbox name="uso_de_fantasias" />} label="Uso de fantasias" />
                        </FormGroup>
                    </fieldset>
                    <hr />
                    <span className="flex justify-between">
                        <button className="px-5 py-2 border rounded-md hover:shadow-sm text-red-500">Cancelar</button>
                        <div className='flex gap-3'>
                            <button className="px-5 py-2 border rounded-md hover:shadow-sm text-primary" type="button" onClick={() => {
                                setFormScreen('dados')
                            }}>Voltar para Dados Pessoais</button>
                            <button className="px-5 py-2 border rounded-md hover:shadow-sm text-white bg-primary" type="button" onClick={() => {
                                setFormScreen('midia')
                            }}>Ir para Mídias</button>
                        </div>
                    </span>
                </div>
                <div className='flex flex-col gap-5 w-full' style={{ display: formScreen == 'midia' ? 'flex' : 'none' }}>
                    <span className='font-extralight text-sm'>Redes Sociais</span>
                    <fieldset className="flex flex-col md:flex-row gap-3">
                        <TextField
                            label='Facebook'
                            name='facebook'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            label='Instagram'
                            name='instagram'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            label='TikTok'
                            name='tiktok'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                    </fieldset>
                    <fieldset className="grid grid-cols-3 gap-3">
                        <TextField
                            label='Onlyfans'
                            name='onlyfans'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            label='Privacy'
                            name='privacy'
                            size='small'
                            sx={{ flex: 1 }}
                        />
                    </fieldset>
                    <span className='font-extralight text-sm'>Mídias</span>
                    <fieldset className='flex justify-between items-center border rounded-md p-1'>
                        <input
                            id='hidden-input-perfil'
                            className="hidden"
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleChangePerfil}
                        />
                        <span className='text-lg'>Foto de Perfil</span>
                        <div className='flex gap-1'>
                            {perfilFile &&
                                <button className='border rounded-md px-4 py-1 bg-green-500 text-white' type="button" onClick={handleClickPerfil}>Imagem selecionada</button>
                            }
                            {!perfilFile &&
                                <button className='border rounded-md px-4 py-1 bg-blue-800 text-white' type="button" onClick={handleClickPerfil}>Escolher imagem</button>
                            }
                            <button className='border rounded-md px-4 py-1' type="button" onClick={() => {
                                if (perfilUrl) {
                                    setPreview('perfil')
                                    setPreviewFloat(true)
                                }
                            }}>Preview</button>
                        </div>
                    </fieldset>
                    <fieldset className='flex justify-between items-center border rounded-md p-1'>
                        <input
                            id='hidden-input-banner'
                            className="hidden"
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleChangeBanner}
                        />
                        <span className='text-lg'>Banner Principal</span>
                        <div className='flex gap-1'>
                            {bannerFile &&
                                <button type="button" className='border rounded-md px-4 py-1 bg-green-500 text-white' onClick={handleClickBanner}>Imagem selecionada</button>
                            }
                            {!bannerFile &&
                                <button type="button" className='border rounded-md px-4 py-1 bg-blue-800 text-white' onClick={handleClickBanner}>Escolher imagem</button>
                            }
                            <button type="button" className='border rounded-md px-4 py-1' onClick={() => {
                                if (bannerUrl) {
                                    setPreview('banner')
                                    setPreviewFloat(true)
                                }
                            }}>Preview</button>
                        </div>
                    </fieldset>
                    <fieldset className='flex justify-between items-center border rounded-md p-1'>
                        <input
                            id='hidden-input-card'
                            className="hidden"
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleChangeCard}
                        />
                        <span className='text-lg'>Banner Card Destaque</span>
                        <div className='flex gap-1'>
                            {cardFile &&
                                <button type="button" className='border rounded-md px-4 py-1 bg-green-500 text-white' onClick={handleClickCard}>Imagem selecionada</button>
                            }
                            {!cardFile &&
                                <button type="button" className='border rounded-md px-4 py-1 bg-blue-800 text-white' onClick={handleClickCard}>Escolher imagem</button>
                            }
                            <button type="button" className='border rounded-md px-4 py-1' onClick={() => {
                                if (cardUrl) {
                                    setPreview('card')
                                    setPreviewFloat(true)
                                }
                            }}>Preview</button>
                        </div>
                    </fieldset>
                    <fieldset className='flex justify-between items-center border rounded-md p-1'>
                        <input
                            id='hidden-input-comparacao'
                            className="hidden"
                            type="file"
                            accept="video/mp4"
                            onChange={handleChangeComparacao}
                        />
                        <span className='text-lg'>Mídia de Comparação</span>
                        <div className='flex gap-1'>
                            {comparacaoFile &&
                                <button type="button" className='border rounded-md px-4 py-1 bg-green-500 text-white' onClick={handleClickComparacao}>Imagem selecionada</button>
                            }
                            {!comparacaoFile &&
                                <button type="button" className='border rounded-md px-4 py-1 bg-blue-800 text-white' onClick={handleClickComparacao}>Escolher vídeo</button>
                            }
                            <button type="button" className='border rounded-md px-4 py-1' onClick={() => {
                                if (comparacaoUrl) {
                                    setPreview('comparacao')
                                    setPreviewFloat(true)
                                }
                            }}>Preview</button>
                        </div>
                    </fieldset>

                    <hr />
                    <span className="flex justify-between">
                        <button className="px-5 py-2 border rounded-md hover:shadow-sm text-red-500">Cancelar</button>
                        <div className='flex gap-3'>
                            <button type="button" className="px-5 py-2 border rounded-md hover:shadow-sm text-primary" onClick={() => {
                                setFormScreen('servicos')
                            }}>Voltar para Serviços</button>
                            <button className="px-5 py-2 border rounded-md hover:shadow-sm text-white bg-primary" type='submit'>Cadastrar</button>
                        </div>
                    </span>
                </div>
            </form>
            {previewFloat &&
                <div className='p-5 border flex flex-col gap-12 bg-white rounded-lg shadow-xl absolute mx-auto h-full min-w-[500px]'>
                    {preview == 'perfil' &&
                        <>
                            <span className='flex justify-between items-center'>
                                <h4>Foto de Perfil</h4>
                                <ClearIcon color='error' onClick={() => setPreviewFloat(false)} sx={{ cursor: 'pointer' }} />
                            </span>
                            <div className='w-full flex-1 flex items-center justify-center flex-col gap-5'>
                                {perfilUrl &&
                                    <img className='max-h-72 max-w-72 md:h-72 md:w-72 rounded-full' src={perfilUrl} alt="Imagem de Perfil" />
                                }
                                <span className='text-gray-400'>Preview</span>
                            </div>
                        </>
                    }
                    {preview == 'banner' &&
                        <>
                            <span className='flex justify-between items-center'>
                                <h4>Banner - Página da Acompanhante</h4>
                                <ClearIcon color='error' onClick={() => setPreviewFloat(false)} sx={{ cursor: 'pointer' }} />
                            </span>
                            <div className='w-full flex-1 flex items-center justify-center flex-col gap-5'>
                                {bannerUrl &&
                                    <img className='w-[1080px] h-[720px]' src={bannerUrl} alt="Banner" />
                                }
                                <span className='text-gray-400'>Preview</span>
                            </div>
                        </>
                    }
                    {preview == 'card' &&
                        <>
                            <span className='flex justify-between items-center'>
                                <h4>Card - Destaques</h4>
                                <ClearIcon color='error' onClick={() => setPreviewFloat(false)} sx={{ cursor: 'pointer' }} />
                            </span>
                            <div className='w-full flex-1 flex items-center justify-center flex-col gap-5'>
                                {cardUrl &&
                                    <img className='w-[250px] h-[400px] border border-secondary p-2 rounded-lg' src={cardUrl} alt="Banner" />
                                }
                                <span className='text-gray-400'>Preview</span>
                            </div>
                        </>
                    }
                    {preview == 'comparacao' &&
                        <>
                            <span className='flex justify-between items-center'>
                                <h4>Midia de Comparação</h4>
                                <ClearIcon color='error' onClick={() => setPreviewFloat(false)} sx={{ cursor: 'pointer' }} />
                            </span>
                            <div className='w-full flex-1 flex items-center justify-center flex-col gap-5'>
                                {comparacaoUrl &&
                                    <video src={comparacaoUrl} controls width="200" height="100">
                                        Seu navegador não suporta a tag de vídeo.
                                    </video>
                                }
                                <span className='text-gray-400'>Preview</span>
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default InserirAcompanhante